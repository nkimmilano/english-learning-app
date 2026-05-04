import { GameState } from '../types';
import { INITIAL_BADGES } from '../data/badges';

const STORAGE_KEY = 'english-quest-state';

export const DEFAULT_STATE: GameState = {
  profile: null,
  xp: 0,
  level: 1,
  streakDays: 0,
  lastPlayedDate: '',
  badges: INITIAL_BADGES,
  lessonProgress: {},
  dailyChallengeDate: '',
  dailyChallengeCompleted: false,
  totalWordsLearned: 0,
  totalHangmanCorrect: 0,
  totalReadingPassages: 0,
  settings: {
    soundEnabled: true,
    teacherModeUnlocked: false,
  },
};

export function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const saved = JSON.parse(raw) as Partial<GameState>;
    // Merge with default to handle new fields
    return {
      ...DEFAULT_STATE,
      ...saved,
      settings: { ...DEFAULT_STATE.settings, ...(saved.settings ?? {}) },
      badges: INITIAL_BADGES.map(b => {
        const savedBadge = saved.badges?.find(sb => sb.id === b.id);
        return savedBadge ? { ...b, ...savedBadge } : b;
      }),
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function xpForLevel(level: number): number {
  return level * 100;
}

export function levelFromXP(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function xpProgressInLevel(xp: number): number {
  return xp % 100;
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}
