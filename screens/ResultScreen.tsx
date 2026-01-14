
import React from 'react';
import { RecognitionResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ResultScreenProps {
  image: string | null;
  result: RecognitionResult | null;
  isLoading: boolean;
  onConfirm: (result: RecognitionResult) => void;
  onBack: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ image, result, isLoading, onConfirm, onBack }) => {
  const chartData = result ? [
    { name: 'Carbs', value: result.macros.carbs, color: '#D1CEC4' },
    { name: 'Fats', value: result.macros.fats, color: '#ECD678' },
    { name: 'Protein', value: result.macros.protein, color: '#789782' },
  ] : [];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col group/design-root overflow-hidden animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center px-6 pt-6 pb-2 justify-between z-10 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full bg-gray-50 dark:bg-white/10 hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button onClick={onBack} className="flex h-10 items-center justify-center px-3 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-bold">Retake</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Image Container */}
        <div className="px-4 pt-2 pb-6">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-card group">
            <div 
              className="w-full h-full bg-center bg-cover transition-transform duration-700 hover:scale-105" 
              style={{ backgroundImage: `url('${image || 'https://picsum.photos/seed/food/800/600'}')` }}
            ></div>
            {result && (
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                <span className="text-xs font-bold text-primary dark:text-white">{result.confidence}% Match</span>
              </div>
            )}
            <button className="absolute bottom-4 right-4 bg-white dark:bg-[#2C362F] p-2.5 rounded-full shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center space-y-4">
            <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-xl font-bold text-primary">NutriLens is identifying...</h2>
            <p className="text-text-secondary dark:text-gray-400 text-sm">Analyzing ingredients and nutritional value with Gemini AI.</p>
          </div>
        ) : result && (
          <>
            <div className="px-6 flex flex-col gap-1 items-center animate-fade-in">
              <h1 className="text-text-main dark:text-white tracking-tight text-3xl font-bold text-center">{result.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{result.description}</p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center animate-fade-in">
              <div className="flex flex-col items-center">
                <span className="text-primary text-[64px] leading-none font-bold tracking-tighter">{result.calories}</span>
                <span className="text-primary/60 dark:text-primary/80 text-lg font-bold uppercase tracking-widest mt-1">kcal</span>
              </div>
            </div>

            <div className="mx-4 mt-10 mb-6 bg-accent-cream/50 dark:bg-white/5 rounded-3xl p-6 relative overflow-hidden animate-fade-in">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-center gap-8 justify-between">
                <div className="relative size-40 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={32}
                        outerRadius={40}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Macros</span>
                  </div>
                </div>

                <div className="flex-1 w-full grid grid-cols-1 gap-4">
                  {chartData.map((macro, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }}></div>
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{macro.name}</span>
                      </div>
                      <span className="text-base font-bold text-text-main dark:text-white">{macro.value}g</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {result && !isLoading && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-white/0 dark:from-background-dark dark:via-background-dark dark:to-transparent pt-12">
          <button 
            onClick={() => onConfirm(result)}
            className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all duration-200 text-white font-bold text-lg h-14 rounded-xl shadow-soft flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined filled">check_circle</span>
            Confirm & Log
          </button>
        </div>
      )}
    </div>
  );
};
