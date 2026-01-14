
import React from 'react';

export const Splash: React.FC = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center group/design-root overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center animate-fade-in">
        <div className="mb-8 relative group cursor-default">
          <div className="absolute -inset-4 border border-primary/20 rounded-full scale-110 animate-pulse"></div>
          <div className="flex flex-col gap-3 animate-float">
            <div className="relative w-36 h-36 bg-white dark:bg-background-dark rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(120,151,130,0.25)] flex items-center justify-center overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
              <div className="w-20 h-20 relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[5rem] text-primary" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}>
                  shutter_speed
                </span>
                <span className="material-symbols-outlined text-4xl text-primary absolute bottom-[-10px] right-[-10px] bg-white dark:bg-background-dark rounded-full p-1 shadow-sm" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                  eco
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-1">
          <h1 className="text-primary tracking-tight text-[42px] font-bold leading-tight px-4 pb-1">
            NutriLens
          </h1>
          <p className="text-[#8A9B8F] dark:text-[#A1B8A8] text-lg font-medium tracking-wide leading-normal px-4">
            Snap. Eat. Track.
          </p>
          <p className="text-gray-400 dark:text-gray-600 text-xs uppercase tracking-[0.2em] font-semibold pt-4">
            AI Food Tracker
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[35vh] w-full z-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-20%] right-[-20%] h-full bg-[#FCF7E6] dark:bg-[#253028] rounded-t-[50%] scale-x-125 md:scale-x-110"></div>
      </div>

      <div className="absolute bottom-12 z-20 flex flex-col items-center gap-3">
        <div className="h-1 w-32 bg-primary/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
        <p className="text-[10px] text-primary/40 dark:text-white/20 font-medium">Version 1.0</p>
      </div>
    </div>
  );
};
