
import React, { useRef, useState, useEffect } from 'react';

interface CameraScreenProps {
  onCapture: (image: string) => void;
  onBack: () => void;
}

export const CameraScreen: React.FC<CameraScreenProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' },
          audio: false 
        });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        onCapture(dataUrl);
      }
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-black group/design-root">
      {/* Background Camera Feed */}
      <video 
        ref={videoRef}
        autoPlay 
        playsInline 
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 pointer-events-none"></div>

      {/* Top Control Bar */}
      <div className="relative z-20 flex w-full items-center justify-between p-6 pt-12">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white shadow-soft transition-transform active:scale-95">
          <span className="material-symbols-outlined">close</span>
        </button>
        <button className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white shadow-soft">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>

      {/* Central Focus Area */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pointer-events-none">
        <div className="relative size-72 rounded-3xl border-[1.5px] border-primary/80 shadow-glow">
          <div className="absolute -left-[1px] -top-[1px] size-8 rounded-tl-3xl border-l-4 border-t-4 border-white/90"></div>
          <div className="absolute -right-[1px] -top-[1px] size-8 rounded-tr-3xl border-r-4 border-t-4 border-white/90"></div>
          <div className="absolute -bottom-[1px] -left-[1px] size-8 rounded-bl-3xl border-b-4 border-l-4 border-white/90"></div>
          <div className="absolute -bottom-[1px] -right-[1px] size-8 rounded-br-3xl border-b-4 border-r-4 border-white/90"></div>
        </div>
        <div className="mt-6 rounded-full bg-black/40 px-4 py-2 backdrop-blur-md">
          <p className="text-sm font-medium tracking-wide text-white/90">Align food in frame</p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-20 w-full pb-10 pt-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="relative flex flex-col items-center gap-6 px-8">
          <div className="flex gap-6 text-sm font-semibold tracking-wider text-white/70">
            <span className="cursor-pointer hover:text-white transition-colors">BARCODE</span>
            <span className="cursor-pointer text-accent-cream drop-shadow-[0_0_8px_rgba(252,247,230,0.6)]">FOOD</span>
            <span className="cursor-pointer hover:text-white transition-colors">LABEL</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <button className="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="size-6 bg-cover bg-center rounded opacity-80" style={{ backgroundImage: "url('https://picsum.photos/seed/food/50/50')" }}></div>
            </button>
            <button 
              onClick={captureImage}
              className="group relative flex size-20 items-center justify-center rounded-full bg-accent-cream shadow-[0_0_0_6px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95"
            >
              <div className="flex size-16 items-center justify-center rounded-full border-2 border-primary/20 bg-accent-cream">
                <span className="material-symbols-outlined text-primary text-[32px]">restaurant</span>
              </div>
            </button>
            <button className="flex size-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white transition-all active:scale-95">
              <span className="material-symbols-outlined text-[24px]">flash_on</span>
            </button>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
