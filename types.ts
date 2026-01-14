
export enum AppScreen {
  SPLASH = 'SPLASH',
  DASHBOARD = 'DASHBOARD',
  CAMERA = 'CAMERA',
  RESULT = 'RESULT',
  PROFILE = 'PROFILE'
}

export interface MacroStats {
  protein: number;
  carbs: number;
  fats: number;
}

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  macros: MacroStats;
  description: string;
  image: string;
  timestamp: number;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
}

export interface RecognitionResult {
  name: string;
  calories: number;
  macros: MacroStats;
  description: string;
  confidence: number;
}
