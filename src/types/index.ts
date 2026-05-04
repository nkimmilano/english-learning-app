export type DrillType =
  | 'fill-blank'
  | 'word-image'
  | 'hangman'
  | 'scramble'
  | 'sentence-builder'
  | 'listening'
  | 'quiz'
  | 'clock'
  | 'reading-comprehension'
  | 'homophone';

export type Zone = 'a1' | 'a1plus' | 'a2' | 'b1' | 'b2';

export interface RCQuestion {
  question: string;
  correctAnswer: string;
  options: string[];            // shuffled at render time, never rely on index
  explanation: string;          // shown after student answers
  questionType: 'literal' | 'vocabulary' | 'inference' | 'true-false-not-given';
}

export interface Drill {
  id: string;
  type: DrillType;
  // Standard fields (most drills)
  question: string;
  correctAnswer: string;
  options?: string[];           // store raw order; shuffle at render time
  imageEmoji?: string;
  hint?: string;
  words?: string[];             // sentence-builder tiles
  hours?: number;               // clock drills
  minutes?: number;             // clock drills
  homophoneExplanation?: string; // shown after homophone answer
  homophones?: string[];         // alias for options in homophone drills (display hint)
  // Reading comprehension fields
  passage?: string;             // 80–150 word paragraph
  readingLevel?: 'b1' | 'b2';
  topic?: string;               // e.g. 'cars', 'superheroes', 'space'
  wordCount?: number;
  rcQuestions?: RCQuestion[];   // sub-questions for reading comp
}

export interface Lesson {
  id: string;
  zone: Zone;
  category: string;
  title: string;
  icon: string;
  drills: Drill[];
  requiredXP: number;
  color: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: number;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  bestScore: number;
  attemptsCount: number;
  lastPlayed: number;
  perfectScores: number;
  drillTypesSeen: DrillType[];
}

export interface PlayerProfile {
  nickname: string;
  avatarEmoji: string;
  createdAt: number;
}

export interface GameState {
  profile: PlayerProfile | null;
  xp: number;
  level: number;
  streakDays: number;
  lastPlayedDate: string;
  badges: Badge[];
  lessonProgress: Record<string, LessonProgress>;
  dailyChallengeDate: string;
  dailyChallengeCompleted: boolean;
  totalWordsLearned: number;
  totalHangmanCorrect: number;
  totalReadingPassages: number;
  settings: {
    soundEnabled: boolean;
    teacherModeUnlocked: boolean;
  };
}
