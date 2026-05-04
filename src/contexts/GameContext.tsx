import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { create } from 'zustand';
import { GameState, PlayerProfile, LessonProgress, DrillType } from '../types';
import { loadState, saveState, clearState, levelFromXP, getTodayString } from '../utils/storage';
import { LESSONS } from '../data/lessons';
import { SFX } from '../utils/sound';

interface GameStore extends GameState {
  // Actions
  createProfile: (profile: PlayerProfile) => void;
  addXP: (amount: number) => boolean; // returns true if levelled up
  completeDrill: (lessonId: string, correct: boolean, drillType: DrillType) => void;
  completeLesson: (lessonId: string, score: number) => { xpEarned: number; newBadges: string[] };
  completeDailyChallenge: (score: number) => { xpEarned: number };
  updateStreak: () => void;
  toggleSound: () => void;
  unlockTeacherMode: () => void;
  resetProgress: () => void;
}

const useGameStore = create<GameStore>((set, get) => {
  const initial = loadState();

  const persist = () => {
    const state = get();
    saveState({
      profile: state.profile,
      xp: state.xp,
      level: state.level,
      streakDays: state.streakDays,
      lastPlayedDate: state.lastPlayedDate,
      badges: state.badges,
      lessonProgress: state.lessonProgress,
      dailyChallengeDate: state.dailyChallengeDate,
      dailyChallengeCompleted: state.dailyChallengeCompleted,
      totalWordsLearned: state.totalWordsLearned,
      totalHangmanCorrect: state.totalHangmanCorrect,
      totalReadingPassages: state.totalReadingPassages,
      settings: state.settings,
    });
  };

  return {
    ...initial,

    createProfile(profile) {
      set({ profile });
      persist();
    },

    addXP(amount) {
      const state = get();
      const newXP = state.xp + amount;
      const oldLevel = state.level;
      const newLevel = levelFromXP(newXP);
      const leveledUp = newLevel > oldLevel;
      set({ xp: newXP, level: newLevel });
      persist();
      if (leveledUp && state.settings.soundEnabled) SFX.levelUp();
      return leveledUp;
    },

    completeDrill(lessonId, correct, drillType) {
      const state = get();
      const prev = state.lessonProgress[lessonId] ?? {
        lessonId,
        completed: false,
        bestScore: 0,
        attemptsCount: 0,
        lastPlayed: Date.now(),
        perfectScores: 0,
        drillTypesSeen: [],
      };
      const drillTypesSeen = prev.drillTypesSeen.includes(drillType)
        ? prev.drillTypesSeen
        : [...prev.drillTypesSeen, drillType];

      const newHangmanCorrect =
        drillType === 'hangman' && correct
          ? state.totalHangmanCorrect + 1
          : state.totalHangmanCorrect;

      set({
        lessonProgress: {
          ...state.lessonProgress,
          [lessonId]: { ...prev, drillTypesSeen, lastPlayed: Date.now() },
        },
        totalHangmanCorrect: newHangmanCorrect,
      });

      if (correct && state.settings.soundEnabled) SFX.correct();
      if (!correct && state.settings.soundEnabled) SFX.wrong();
    },

    completeLesson(lessonId, score) {
      const state = get();
      const prev = state.lessonProgress[lessonId];
      const lesson = LESSONS.find(l => l.id === lessonId);

      let xpEarned = Math.round((score / 100) * 50); // up to 50 XP for drills
      if (score === 100) xpEarned += 5; // perfect score bonus
      if (!prev?.completed) xpEarned += 10; // first-time completion bonus

      const newProgress: LessonProgress = {
        lessonId,
        completed: true,
        bestScore: Math.max(score, prev?.bestScore ?? 0),
        attemptsCount: (prev?.attemptsCount ?? 0) + 1,
        lastPlayed: Date.now(),
        perfectScores: (prev?.perfectScores ?? 0) + (score === 100 ? 1 : 0),
        drillTypesSeen: prev?.drillTypesSeen ?? [],
      };

      // Badge checks
      const newBadges: string[] = [];
      let badges = [...state.badges];
      const allLessonProgress = { ...state.lessonProgress, [lessonId]: newProgress };

      // First Steps
      const firstStepsBadge = badges.find(b => b.id === 'first-steps');
      if (firstStepsBadge && !firstStepsBadge.earned) {
        badges = badges.map(b => b.id === 'first-steps' ? { ...b, earned: true, earnedAt: Date.now() } : b);
        newBadges.push('first-steps');
      }

      // Perfect Score
      if (score === 100) {
        const pb = badges.find(b => b.id === 'perfect-score');
        if (pb && !pb.earned) {
          badges = badges.map(b => b.id === 'perfect-score' ? { ...b, earned: true, earnedAt: Date.now() } : b);
          newBadges.push('perfect-score');
        }
      }

      // A1 Graduate
      if (lesson?.zone === 'a1') {
        const a1Lessons = LESSONS.filter(l => l.zone === 'a1');
        const allA1Done = a1Lessons.every(l => allLessonProgress[l.id]?.completed);
        if (allA1Done) {
          const a1b = badges.find(b => b.id === 'zone-a1');
          if (a1b && !a1b.earned) {
            badges = badges.map(b => b.id === 'zone-a1' ? { ...b, earned: true, earnedAt: Date.now() } : b);
            newBadges.push('zone-a1');
          }
        }
      }

      // Word Wizard — count unique vocabulary drills seen
      const totalWords = Object.values(allLessonProgress).reduce((sum, lp) => {
        const l = LESSONS.find(ls => ls.id === lp.lessonId);
        return sum + (l?.drills.filter(d => d.type === 'word-image' || d.type === 'scramble').length ?? 0);
      }, 0);
      if (totalWords >= 50) {
        const wb = badges.find(b => b.id === 'word-wizard');
        if (wb && !wb.earned) {
          badges = badges.map(b => b.id === 'word-wizard' ? { ...b, earned: true, earnedAt: Date.now() } : b);
          newBadges.push('word-wizard');
        }
      }

      // Explorer — all drill types seen
      const allDrillTypes: DrillType[] = ['fill-blank', 'word-image', 'hangman', 'scramble', 'sentence-builder', 'listening', 'quiz', 'clock', 'reading-comprehension'];
      const seenTypes = new Set(Object.values(allLessonProgress).flatMap(lp => lp.drillTypesSeen));
      if (allDrillTypes.every(t => seenTypes.has(t))) {
        const eb = badges.find(b => b.id === 'explorer');
        if (eb && !eb.earned) {
          badges = badges.map(b => b.id === 'explorer' ? { ...b, earned: true, earnedAt: Date.now() } : b);
          newBadges.push('explorer');
        }
      }

      // Bookworm — 5 reading comprehension passages completed
      const hasRCDrill = lesson?.drills.some(d => d.type === 'reading-comprehension');
      const newReadingPassages = hasRCDrill
        ? state.totalReadingPassages + 1
        : state.totalReadingPassages;
      if (newReadingPassages >= 5) {
        const bwb = badges.find(b => b.id === 'bookworm');
        if (bwb && !bwb.earned) {
          badges = badges.map(b => b.id === 'bookworm' ? { ...b, earned: true, earnedAt: Date.now() } : b);
          newBadges.push('bookworm');
        }
      }

      // Spelling Champion — 20 hangman correct
      if (get().totalHangmanCorrect >= 20) {
        const scb = badges.find(b => b.id === 'spelling-champ');
        if (scb && !scb.earned) {
          badges = badges.map(b => b.id === 'spelling-champ' ? { ...b, earned: true, earnedAt: Date.now() } : b);
          newBadges.push('spelling-champ');
        }
      }

      set({ lessonProgress: allLessonProgress, badges, totalWordsLearned: totalWords, totalReadingPassages: newReadingPassages });

      get().addXP(xpEarned);

      // Level badges
      const newLevel = levelFromXP(get().xp);
      if (newLevel >= 5) {
        const lb5 = get().badges.find(b => b.id === 'level-5');
        if (lb5 && !lb5.earned) {
          set({ badges: get().badges.map(b => b.id === 'level-5' ? { ...b, earned: true, earnedAt: Date.now() } : b) });
          newBadges.push('level-5');
        }
      }

      persist();
      if (state.settings.soundEnabled) SFX.complete();
      return { xpEarned, newBadges };
    },

    completeDailyChallenge(score) {
      const state = get();
      const today = getTodayString();
      let xpEarned = Math.round((score / 100) * 100); // double XP for daily
      set({ dailyChallengeDate: today, dailyChallengeCompleted: true });
      get().addXP(xpEarned);
      persist();
      return { xpEarned };
    },

    updateStreak() {
      const state = get();
      const today = getTodayString();
      if (state.lastPlayedDate === today) return;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const newStreak = state.lastPlayedDate === yesterdayStr ? state.streakDays + 1 : 1;

      let badges = [...state.badges];
      const newBadges: string[] = [];

      if (newStreak >= 3) {
        const sb3 = badges.find(b => b.id === 'streak-3');
        if (sb3 && !sb3.earned) {
          badges = badges.map(b => b.id === 'streak-3' ? { ...b, earned: true, earnedAt: Date.now() } : b);
          newBadges.push('streak-3');
        }
      }
      if (newStreak >= 7) {
        const sb7 = badges.find(b => b.id === 'streak-7');
        if (sb7 && !sb7.earned) {
          badges = badges.map(b => b.id === 'streak-7' ? { ...b, earned: true, earnedAt: Date.now() } : b);
        }
      }

      set({ streakDays: newStreak, lastPlayedDate: today, badges });
      persist();
    },

    toggleSound() {
      const state = get();
      set({ settings: { ...state.settings, soundEnabled: !state.settings.soundEnabled } });
      persist();
    },

    unlockTeacherMode() {
      set(state => ({ settings: { ...state.settings, teacherModeUnlocked: true } }));
      persist();
    },

    resetProgress() {
      clearState();
      set(loadState());
    },
  };
});

const GameContext = createContext<typeof useGameStore | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef(useGameStore);

  useEffect(() => {
    useGameStore.getState().updateStreak();
  }, []);

  return (
    <GameContext.Provider value={storeRef.current}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useGameStore();
}
