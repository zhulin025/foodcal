
import React from 'react';
import { AppScreen } from '../types';
import { BottomNav } from '../components/BottomNav';

interface ProfileProps {
  onNavigate: (screen: AppScreen) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen pb-24 overflow-x-hidden animate-fade-in">
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
        <button onClick={() => onNavigate(AppScreen.DASHBOARD)} className="flex size-10 shrink-0 items-center justify-center rounded-full text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold">Profile</h1>
        <button className="flex size-10 shrink-0 items-center justify-center rounded-full text-slate-800 dark:text-slate-200">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>

      <section className="flex flex-col items-center px-6 pt-2 pb-6">
        <div className="relative mb-4 group cursor-pointer">
          <div className="absolute -inset-1 rounded-full bg-primary/20 scale-105 group-hover:scale-110 transition-transform"></div>
          <div className="relative h-28 w-28 rounded-full border-[3px] border-primary p-1 bg-white dark:bg-background-dark">
            <div className="h-full w-full rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/jane/200/200')" }}></div>
          </div>
          <div className="absolute bottom-1 right-1 flex size-8 items-center justify-center rounded-full bg-primary text-white border-2 border-white dark:border-background-dark">
            <span className="material-symbols-outlined text-sm">edit</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Jane Doe</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">Member since 2023</p>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary">
          <span className="material-symbols-outlined text-sm filled">spa</span>
          <span className="text-xs font-semibold">Goal: Maintain Weight</span>
        </div>
      </section>

      <section className="px-4 mb-8">
        <div className="grid grid-cols-3 gap-3">
          <StatBox label="Day Streak" value="12" icon="local_fire_department" />
          <StatBox label="Avg. Cals" value="1,850" icon="bolt" />
          <StatBox label="Lbs Lost" value="-2.5" icon="monitor_weight" />
        </div>
      </section>

      <section className="px-4 mb-8">
        <div className="w-full rounded-[2rem] bg-accent-cream dark:bg-white/5 p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Consistency</h3>
                <span className="text-sm font-medium text-slate-500">November 2023</span>
              </div>
              <div className="flex gap-1">
                <button className="size-8 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
                <button className="size-8 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center">
              {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-[11px] font-bold text-slate-400 uppercase">{d}</div>)}
              {[...Array(31)].map((_, i) => (
                <div key={i} className="aspect-square flex items-center justify-center">
                  <div className={`size-8 flex items-center justify-center rounded-full text-xs font-semibold ${i < 12 ? 'bg-primary text-white' : 'border border-slate-200 text-slate-300'}`}>
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 flex flex-col gap-3">
        <h3 className="px-2 text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Preferences</h3>
        <PreferenceItem label="Food History" subLabel="View your past meals" icon="restaurant_menu" />
        <PreferenceItem label="Personal Goals" subLabel="Calories & Macros" icon="target" />
        <PreferenceItem label="App Settings" subLabel="Notifications, Account" icon="settings" />
        <button className="mt-2 text-center text-sm font-medium text-slate-400 py-2">Log Out</button>
      </section>

      <BottomNav currentScreen={AppScreen.PROFILE} onNavigate={onNavigate} />
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: string; icon: string }> = ({ label, value, icon }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl bg-white dark:bg-white/5 p-3 shadow-soft border border-slate-100 dark:border-white/5">
    <div className="mb-1 text-primary">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
    <p className="text-xs font-medium text-slate-400">{label}</p>
  </div>
);

const PreferenceItem: React.FC<{ label: string; subLabel: string; icon: string }> = ({ label, subLabel, icon }) => (
  <button className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-white dark:bg-white/5 p-4 text-left shadow-soft border border-slate-100 dark:border-white/5">
    <div className="flex items-center gap-4">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <div>
        <p className="text-[15px] font-bold text-slate-900 dark:text-white">{label}</p>
        <p className="text-xs text-slate-500">{subLabel}</p>
      </div>
    </div>
    <span className="material-symbols-outlined text-slate-300">chevron_right</span>
  </button>
);
