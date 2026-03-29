import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Square, Video, VideoOff } from 'lucide-react';
import { toast } from 'sonner';
import { interviewService } from '@/services/interviewService';


interface AudioRecorderProps {
  onRecordingComplete: (
    audioBlob: Blob,
    videoBlob: Blob | null,
    transcript: string
  ) => void;
  question: string;
}

export const AudioRecorder = ({ onRecordingComplete, question }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const videoChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [liveCaption, setLiveCaption] = useState("");
  const recognizerRef = useRef<any>(null);
  const captionTimeoutRef = useRef<any>(null);

  useEffect(() => {
    requestPermissions();
    return () => {
      stopStreams();
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setRecordingTime(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const requestPermissions = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        audio: true,
        video: videoEnabled ? {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } : false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current && videoEnabled) {
        videoRef.current.srcObject = stream;
      }

      setHasPermissions(true);
      toast.success('Camera and microphone access granted');
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast.error('Failed to access camera/microphone. Please grant permissions.');
      setHasPermissions(false);
    }
  };

//live speech recognizer
 const startLiveCaptions = async () => {

  const speechConfig = speechsdk.SpeechConfig.fromSubscription(
    import.meta.env.VITE_AZURE_SPEECH_KEY,
    import.meta.env.VITE_AZURE_REGION
  );

  speechConfig.speechRecognitionLanguage = "en-US";

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const audioContext = new AudioContext({ sampleRate: 16000 });

  const source = audioContext.createMediaStreamSource(stream);

  const processor = audioContext.createScriptProcessor(4096, 1, 1);

  const pushStream = speechsdk.AudioInputStream.createPushStream();

  processor.onaudioprocess = (event) => {
    const input = event.inputBuffer.getChannelData(0);

    const buffer = new ArrayBuffer(input.length * 2);
    const view = new DataView(buffer);

    let offset = 0;

    for (let i = 0; i < input.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }

    pushStream.write(buffer);
  };

  source.connect(processor);
  processor.connect(audioContext.destination);

  const audioConfig = speechsdk.AudioConfig.fromStreamInput(pushStream);

  const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizing = (_, event) => {
  if (event.result.text) {

    const text = event.result.text;

    setLiveCaption(text);
    // clear old timer
    if (captionTimeoutRef.current) {
      clearTimeout(captionTimeoutRef.current);
    }
    // hide caption after 3 seconds
    captionTimeoutRef.current = setTimeout(() => {
      setLiveCaption("");
    }, 3000);
  }
};

  recognizer.startContinuousRecognitionAsync();

  recognizerRef.current = recognizer;
};

const stopLiveCaptions = () => {

  if (recognizerRef.current) {
    recognizerRef.current.stopContinuousRecognitionAsync();
    recognizerRef.current.close();
    recognizerRef.current = null;
  }

  if (captionTimeoutRef.current) {
    clearTimeout(captionTimeoutRef.current);
  }

  setLiveCaption("");
};

  const stopStreams = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = () => {
    startLiveCaptions();
    if (!streamRef.current) {
      toast.error('Media stream not available');
      return;
    }

    audioChunksRef.current = [];
    videoChunksRef.current = [];

    // Setup audio recorder
    const audioStream = new MediaStream(
      streamRef.current.getAudioTracks()
    );
   
    audioRecorderRef.current = new MediaRecorder(audioStream);

    audioRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    if (videoEnabled) {
      const videoStream = new MediaStream([
        ...streamRef.current.getVideoTracks(),
        ...streamRef.current.getAudioTracks()
      ]);
      videoRecorderRef.current = new MediaRecorder(videoStream);
      
      videoRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoChunksRef.current.push(event.data);
        }
      };

      videoRecorderRef.current.start();
    }

    audioRecorderRef.current.start();
    setIsRecording(true);
    toast.success('Recording started');
  };

  const stopRecording = () => {
    return new Promise<void>((resolve) => {
      const checkAndResolve = () => {
        const audioStopped = !audioRecorderRef.current || audioRecorderRef.current.state === 'inactive';
        const videoStopped = !videoEnabled || !videoRecorderRef.current || videoRecorderRef.current.state === 'inactive';
        stopLiveCaptions();
        if (audioStopped && videoStopped) {
          resolve();
        }
      };

      if (audioRecorderRef.current && audioRecorderRef.current.state !== 'inactive') {
        audioRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/ogg' });
          const videoBlob =
            videoEnabled && videoChunksRef.current.length > 0
              ? new Blob(videoChunksRef.current, { type: 'video/webm' })
              : null;

          let userAnswerText = ""; 

          try {
            const sttResponse = await interviewService.speechToText(audioBlob);
            console.log("STT Response:", sttResponse);
            userAnswerText =
            sttResponse?.transcript ||
            sttResponse?.text ||
            "";

            console.log("STT Text:", userAnswerText);
          } catch (err) {
            console.error("STT failed", err);
          }

          onRecordingComplete(audioBlob, videoBlob, userAnswerText);
        };

        audioRecorderRef.current.stop();
      }

      if (videoEnabled && videoRecorderRef.current && videoRecorderRef.current.state !== 'inactive') {
        videoRecorderRef.current.onstop = checkAndResolve;
        videoRecorderRef.current.stop();
      } else {
        checkAndResolve();
      }

      setIsRecording(false);
      toast.success('Recording stopped');
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-xl font-semibold mb-4">Interview Question:</h3>
          <p className="text-lg">{question}</p>
        </Card>

        {videoEnabled && (
          <Card className="relative overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full aspect-video object-cover"
            />
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-medium">REC {formatTime(recordingTime)}</span>
              </div>
            )}
            {liveCaption && (
               <div className="absolute bottom-6 left-0 right-0 text-center">
                 <span className="bg-black/70 text-white px-4 py-2 rounded text-lg">
                  {liveCaption}
                 </span>
               </div>
            )}
          </Card>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center gap-4">
          {!isRecording ? (
            <Button
              size="lg"
              onClick={startRecording}
              disabled={!hasPermissions}
              className="gap-2"
            >
              <Mic className="w-5 h-5" />
              Start Recording
            </Button>
          ) : (
            <Button
              size="lg"
              variant="destructive"
              onClick={stopRecording}
              className="gap-2"
            >
              <Square className="w-5 h-5" />
              Submit Recording
            </Button>
          )}

          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              setVideoEnabled(!videoEnabled);
              if (!videoEnabled) {
                requestPermissions();
              }
            }}
            disabled={isRecording}
            className="gap-2"
          >
            {videoEnabled ? (
              <>
                <Video className="w-5 h-5" />
                Video On
              </>
            ) : (
              <>
                <VideoOff className="w-5 h-5" />
                Video Off
              </>
            )}
          </Button>
        </div>

        {!hasPermissions && (
          <p className="text-center text-sm text-muted-foreground">
            Please grant camera and microphone permissions to continue
          </p>
        )}

        {isRecording && (
          <p className="text-center text-sm text-yellow-500">
            Note: You can only record once. Click "Submit Recording" when done.
          </p>
        )}
      </div>
    </div>
  );
};
