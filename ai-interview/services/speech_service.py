import os
import tempfile
import subprocess
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
import threading

load_dotenv()

# FFMPEG_PATH = r"C:\ffmpeg\ffmpeg-master-latest-win64-gpl-shared\bin\ffmpeg.exe"
FFMPEG_PATH = r"C:\ffmpeg\ffmpeg-master-latest-win64-gpl-shared\bin\ffmpeg.exe"
def speech_to_text(audio_bytes: bytes):
    input_path = None
    output_path = None
    
    try:
        # 1. Use a context manager but ensure the file is CLOSED before ffmpeg runs
        with tempfile.NamedTemporaryFile(delete=False, suffix=".ogg") as f:
            f.write(audio_bytes)
            input_path = f.name
        
        output_path = input_path.replace(".ogg", ".wav")
        print(f"Converting {input_path} to {output_path}")

        # 2. Run FFmpeg
        subprocess.run(
            [FFMPEG_PATH, "-y", "-i", input_path, "-ar", "16000", "-ac", "1", output_path],
            check=True,
            capture_output=True # Helps in debugging if it fails
        )

        # 3. Azure Logic
        speech_config = speechsdk.SpeechConfig(
            subscription=os.getenv("AZURE_SPEECH_KEY"),
            region=os.getenv("AZURE_REGION")
        )
        audio_config = speechsdk.audio.AudioConfig(filename=output_path)
        """   recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
        
        result = recognizer.recognize_once()
        
        if result.reason == speechsdk.ResultReason.RecognizedSpeech:
            return result.text
        else:
            print(f"Azure Error: {result.reason}")
            return ""
"""
        recognizer = speechsdk.SpeechRecognizer(
            speech_config=speech_config,
            audio_config=audio_config
        )

        transcript = []

        def handle_result(evt):
            if evt.result.text:
                transcript.append(evt.result.text)

        recognizer.recognized.connect(handle_result)

        done = threading.Event()

        def stop_cb(evt):
         done.set()

        recognizer.session_stopped.connect(stop_cb)
        recognizer.canceled.connect(stop_cb)

        recognizer.start_continuous_recognition()

# Wait until recognition finishes
        done.wait()

        recognizer.stop_continuous_recognition()

        return " ".join(transcript)

    except Exception as e:
        print(f"Error in speech_to_text: {str(e)}")
        return f"Error: {str(e)}"
    
    finally:
        # 4. Clean up files manually since we didn't let tempfile delete them automatically
        for path in [input_path, output_path]:
            if path and os.path.exists(path):
                try:
                    os.remove(path)
                except:
                    pass
