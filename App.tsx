
import React, { useState, useEffect, useCallback } from 'react';
import { AppScreen, FoodEntry, RecognitionResult } from './types';
import { Splash } from './screens/Splash';
import { Dashboard } from './screens/Dashboard';
import { CameraScreen } from './screens/CameraScreen';
import { ResultScreen } from './screens/ResultScreen';
import { Profile } from './screens/Profile';
import { recognizeFood } from './services/geminiService';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [entries, setEntries] = useState<FoodEntry[]>(() => {
    const saved = localStorage.getItem('nutrilens_entries');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        name: 'Avocado Toast',
        calories: 350,
        macros: { protein: 12, carbs: 45, fats: 18 },
        description: 'Whole grain bread, 1/2 avocado, egg',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP2AQNapjBoJLWZMkwucR_2efjWfNQjCNT3iQ4H4qcWvk-bS8W8PihxG42IocjJxujgvkh77woBhZzo3e27SZBGFntVBs53uiIFAsiMEqpMHhPLAn627JVL2Z9-l8zzLbIbd8Q_i0rn-UUdccNXW0k54xIs_L9ylcE8gCd3KvA6gkS9icq5HZL4jb3v0SHabRzEPMt5_167l5WEO0FAJJdF3TibeAAeMGC2aD6QXQDNMZIOtgtNRJ2ag7yTsa8hYc6xJFmd0kSDjc',
        timestamp: Date.now() - 3600000 * 4,
        type: 'Breakfast'
      },
      {
        id: '2',
        name: 'Green Smoothie',
        calories: 180,
        macros: { protein: 5, carbs: 35, fats: 2 },
        description: 'Spinach, apple, ginger, lemon',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCulA_XUd8q615EIyYpDDtK_xC99sM7bcoQowV5ybjN2O1nvN7HwxsmwelQLEO0T271CrawQq4plhSjWfy4w28pRb6AQ0QDpv5vUxfsbAeiif1-DbrnkkfStx6YvNvqm8Ry0JWmz4pePwYKZZGPxHRQHDlauWTZqIs5Yjam__742-0WcOy5IBb04eNWmrO-igVxQVQluxXuBhNVJPtCEOdZx1jeTJ7bqKNRnF-ta5-p1z5DJJpw6zPnIAAS5jKSxXTnv5wsnTORCog',
        timestamp: Date.now() - 3600000 * 2,
        type: 'Snack'
      }
    ];
  });
  
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    localStorage.setItem('nutrilens_entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    if (screen === AppScreen.SPLASH) {
      const timer = setTimeout(() => setScreen(AppScreen.DASHBOARD), 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleCapture = async (image: string) => {
    setPendingImage(image);
    setIsProcessing(true);
    setScreen(AppScreen.RESULT);
    
    try {
      const result = await recognizeFood(image);
      setRecognitionResult(result);
    } catch (error) {
      console.error('Failed to recognize food:', error);
      // Fallback/Error state could be handled here
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmLog = (result: RecognitionResult) => {
    const newEntry: FoodEntry = {
      id: Math.random().toString(36).substr(2, 9),
      name: result.name,
      calories: result.calories,
      macros: result.macros,
      description: result.description,
      image: pendingImage || '',
      timestamp: Date.now(),
      type: 'Lunch' // Simplified logic for demo
    };
    setEntries(prev => [newEntry, ...prev]);
    setScreen(AppScreen.DASHBOARD);
    setPendingImage(null);
    setRecognitionResult(null);
  };

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.SPLASH:
        return <Splash />;
      case AppScreen.DASHBOARD:
        return <Dashboard entries={entries} onNavigate={setScreen} />;
      case AppScreen.CAMERA:
        return <CameraScreen onCapture={handleCapture} onBack={() => setScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.RESULT:
        return (
          <ResultScreen 
            image={pendingImage} 
            result={recognitionResult} 
            isLoading={isProcessing}
            onConfirm={handleConfirmLog}
            onBack={() => {
              setScreen(AppScreen.DASHBOARD);
              setPendingImage(null);
              setRecognitionResult(null);
            }}
          />
        );
      case AppScreen.PROFILE:
        return <Profile onNavigate={setScreen} />;
      default:
        return <Dashboard entries={entries} onNavigate={setScreen} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {renderScreen()}
    </div>
  );
};

export default App;
