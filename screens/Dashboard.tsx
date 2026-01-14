
import React from 'react';
import { FoodEntry, AppScreen } from '../types';
import { BottomNav } from '../components/BottomNav';

interface DashboardProps {
  entries: FoodEntry[];
  onNavigate: (screen: AppScreen) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ entries, onNavigate }) => {
  const dailyGoal = 2200;
  const caloriesEaten = entries.reduce((acc, entry) => acc + entry.calories, 0);
  const remaining = dailyGoal - caloriesEaten;
  
  const proteinTotal = entries.reduce((acc, entry) => acc + entry.macros.protein, 0);
  const carbsTotal = entries.reduce((acc, entry) => acc + entry.macros.carbs, 0);
  const fatsTotal = entries.reduce((acc, entry) => acc + entry.macros.fats, 0);

  const proteinGoal = 150;
  const carbsGoal = 250;
  const fatsGoal = 70;

  const progressPercentage = (caloriesEaten / dailyGoal) * 100;
  const strokeDashoffset = 264 - (264 * Math.min(progressPercentage, 100)) / 100;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-28 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="relative size-10 shrink-0">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary" style={{ backgroundImage: "url('https://picsum.photos/seed/user/100/100')" }}></div>
            <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-text-secondary dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Welcome back</span>
            <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight">Alex Johnson</h2>
          </div>
        </div>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-text-main dark:text-white">notifications</span>
        </button>
      </header>

      {/* Calorie Ring */}
      <section className="flex flex-col items-center justify-center py-8 px-6">
        <div className="relative size-72">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-110"></div>
          <svg className="size-full transform -rotate-90" viewBox="0 0 100 100">
            <circle className="text-accent-cream dark:text-white/10" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="8"></circle>
            <circle className="text-primary transition-all duration-1000 ease-out" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeDasharray="264" strokeDashoffset={strokeDashoffset} strokeLinecap="round" strokeWidth="8"></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center rotate-90">
            <span className="text-text-secondary dark:text-gray-400 text-sm font-medium mb-1">Remaining</span>
            <h1 className="text-5xl font-extrabold text-text-main dark:text-white tracking-tight">{remaining.toLocaleString()}</h1>
            <span className="text-primary font-bold text-lg">Kcal Left</span>
            <div className="mt-4 flex items-center gap-3 text-sm font-medium text-text-secondary dark:text-gray-400">
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-primary"></span>
                <span>Eaten {caloriesEaten}</span>
              </div>
              <div className="w-px h-3 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-orange-400"></span>
                <span>Burned 320</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Macros */}
      <section className="px-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          <MacroCard label="Protein" value={proteinTotal} goal={proteinGoal} icon="egg_alt" color="bg-primary" />
          <MacroCard label="Carbs" value={carbsTotal} goal={carbsGoal} icon="bakery_dining" color="bg-yellow-600" />
          <MacroCard label="Fats" value={fatsTotal} goal={fatsGoal} icon="oil_barrel" color="bg-orange-500" />
        </div>
      </section>

      {/* Meals List */}
      <section className="px-4 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-text-main dark:text-white text-lg font-bold leading-tight">Today's Meals</h3>
          <button className="text-primary text-sm font-semibold hover:text-primary-dark">See all</button>
        </div>
        <div className="flex flex-col gap-3">
          {entries.map(entry => (
            <div key={entry.id} className="group flex items-center gap-4 bg-white dark:bg-white/5 p-3 pr-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-lg size-16 shrink-0" 
                style={{ backgroundImage: `url('${entry.image}')` }}
              ></div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-text-main dark:text-white text-base font-bold leading-snug line-clamp-1">{entry.name}</p>
                  <span className="text-text-main dark:text-white text-sm font-bold whitespace-nowrap">{entry.calories} Kcal</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-md ${entry.type === 'Breakfast' ? 'bg-green-500' : entry.type === 'Snack' ? 'bg-primary' : 'bg-orange-400'}`}>
                    {entry.type}
                  </span>
                  <p className="text-text-secondary dark:text-gray-400 text-xs line-clamp-1">{entry.description}</p>
                </div>
              </div>
              <div className="shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BottomNav currentScreen={AppScreen.DASHBOARD} onNavigate={onNavigate} />
    </div>
  );
};

const MacroCard: React.FC<{ label: string; value: number; goal: number; icon: string; color: string }> = ({ label, value, goal, icon, color }) => {
  const percentage = Math.min((value / goal) * 100, 100);
  return (
    <div className="bg-accent-cream dark:bg-white/5 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden group">
      <div className="flex items-center gap-2 z-10">
        <span className={`size-2 rounded-full ${color}`}></span>
        <span className="text-text-main dark:text-white text-sm font-bold">{label}</span>
      </div>
      <div className="flex flex-col gap-1 z-10">
        <span className="text-2xl font-bold text-text-main dark:text-white">{value}g</span>
        <span className="text-xs text-text-secondary dark:text-gray-400">Left {goal - value}g</span>
      </div>
      <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full mt-1 z-10">
        <div className={`${color} h-1.5 rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
      </div>
      <span className={`absolute -bottom-4 -right-4 ${color.replace('bg-', 'text-')}/10 material-symbols-outlined`} style={{ fontSize: '80px' }}>{icon}</span>
    </div>
  );
};
