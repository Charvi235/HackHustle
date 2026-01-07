import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Square, Video, VideoOff } from 'lucide-react';
import { toast } from 'sonner';

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob, videoBlob: Blob | null) => void;
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

  const stopStreams = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = () => {
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

    // Setup video recorder if enabled
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
        
        if (audioStopped && videoStopped) {
          resolve();
        }
      };

      if (audioRecorderRef.current && audioRecorderRef.current.state !== 'inactive') {
        audioRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const videoBlob = videoEnabled && videoChunksRef.current.length > 0
            ? new Blob(videoChunksRef.current, { type: 'video/webm' })
            : null;
          
          onRecordingComplete(audioBlob, videoBlob);
          checkAndResolve();
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
        {/* Question on Left */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-xl font-semibold mb-4">Interview Question:</h3>
          <p className="text-lg">{question}</p>
        </Card>

        {/* Video Preview on Right */}
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
          </Card>
        )}
      </div>

      {/* Controls */}
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
