
import React from 'react';
import { AppScreen } from '../types';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#1a1f1b]/90 backdrop-blur-lg border-t border-gray-100 dark:border-white/5 pb-safe pt-2">
      <div className="flex items-center justify-between px-6 pb-6 pt-2">
        <button 
          onClick={() => onNavigate(AppScreen.DASHBOARD)}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === AppScreen.DASHBOARD ? 'text-primary' : 'text-text-secondary dark:text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${currentScreen === AppScreen.DASHBOARD ? 'filled' : ''}`}>home</span>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        
        <button 
          className="flex flex-col items-center gap-1 text-text-secondary dark:text-gray-400 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[28px]">book_2</span>
          <span className="text-[10px] font-medium">Feed</span>
        </button>

        <div className="relative -top-6">
          <button 
            onClick={() => onNavigate(AppScreen.CAMERA)}
            className="flex items-center justify-center size-16 bg-primary hover:bg-primary-dark text-white rounded-full shadow-[0_8px_20px_rgba(120,151,130,0.5)] transform transition-transform active:scale-95 group"
          >
            <span className="material-symbols-outlined text-[32px] group-hover:rotate-12 transition-transform">photo_camera</span>
          </button>
        </div>

        <button 
          className="flex flex-col items-center gap-1 text-text-secondary dark:text-gray-400 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[28px]">bar_chart</span>
          <span className="text-[10px] font-medium">Stats</span>
        </button>

        <button 
          onClick={() => onNavigate(AppScreen.PROFILE)}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === AppScreen.PROFILE ? 'text-primary' : 'text-text-secondary dark:text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${currentScreen === AppScreen.PROFILE ? 'filled' : ''}`}>person</span>
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </nav>
  );
};
