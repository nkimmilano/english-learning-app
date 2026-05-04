import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { LESSONS } from '../data/lessons';
import BottomNav from '../components/layout/BottomNav';
import XPBar from '../components/ui/XPBar';
import BadgeCard from '../components/ui/BadgeCard';

const CEFR_LEVELS = [
  { label: 'A1', minXP: 0,   color: 'bg-green-400' },
  { label: 'A1+', minXP: 150, color: 'bg-blue-400' },
  { label: 'A2', minXP: 350, color: 'bg-orange-400' },
  { label: 'B1', minXP: 550, color: 'bg-purple-500' },
];

export default function ProfilePage() {
  const { profile, xp, level, streakDays, badges, lessonProgress, settings, toggleSound, resetProgress } = useGame();
  const [showReset, setShowReset] = useState(false);

  const completedCount = Object.values(lessonProgress).filter(p => p.completed).length;
  const earnedBadges = badges.filter(b => b.earned).length;

  const cefrIndex = [...CEFR_LEVELS].reverse().findIndex(c => xp >= c.minXP);
  const resolvedCefrIndex = cefrIndex === -1 ? 0 : CEFR_LEVELS.length - 1 - cefrIndex;
  const cefrPercent = resolvedCefrIndex < CEFR_LEVELS.length - 1
    ? ((xp - CEFR_LEVELS[resolvedCefrIndex].minXP) / (CEFR_LEVELS[resolvedCefrIndex + 1].minXP - CEFR_LEVELS[resolvedCefrIndex].minXP)) * 100
    : 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 pb-28">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-4 pt-10 pb-8 text-white text-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
          className="text-8xl mb-3"
        >
          {profile?.avatarEmoji ?? '🦊'}
        </motion.div>
        <h1 className="text-3xl font-black">{profile?.nickname ?? 'Explorer'}</h1>
        <p className="text-indigo-200 mt-1">Level {level} English Learner</p>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-black">{xp}</p>
            <p className="text-indigo-200 text-sm">Total XP</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black">🔥 {streakDays}</p>
            <p className="text-indigo-200 text-sm">Day Streak</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black">{completedCount}</p>
            <p className="text-indigo-200 text-sm">Lessons</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* XP Bar */}
        <XPBar />

        {/* CEFR Progress */}
        <div className="bg-white rounded-3xl p-5 shadow">
          <h2 className="text-xl font-black text-gray-700 mb-3">CEFR Journey 📈</h2>
          <div className="flex items-center gap-2 mb-3">
            {CEFR_LEVELS.map((c, i) => (
              <div key={c.label} className="flex items-center gap-1 flex-1">
                <div className={`flex-1 h-4 rounded-full ${i <= resolvedCefrIndex ? c.color : 'bg-gray-100'} transition-all`} />
                <span className={`text-xs font-bold ${i <= resolvedCefrIndex ? 'text-gray-700' : 'text-gray-300'}`}>{c.label}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Currently at <strong>{CEFR_LEVELS[resolvedCefrIndex]?.label}</strong> · {Math.round(cefrPercent)}% to next level
          </p>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-3xl p-5 shadow">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-black text-gray-700">Badges 🏅</h2>
            <span className="text-sm text-gray-400">{earnedBadges}/{badges.length}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {badges.map((badge, i) => (
              <BadgeCard key={badge.id} badge={badge} index={i} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-3xl p-5 shadow">
          <h2 className="text-xl font-black text-gray-700 mb-3">My Stats 📊</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Lessons Done', value: completedCount, icon: '📚' },
              { label: 'Badges Earned', value: earnedBadges, icon: '🏅' },
              { label: 'Day Streak', value: streakDays, icon: '🔥' },
              { label: 'My Level', value: `Lv ${level}`, icon: '⚡' },
            ].map(stat => (
              <div key={stat.label} className="bg-indigo-50 rounded-2xl p-3 text-center">
                <span className="text-3xl">{stat.icon}</span>
                <p className="text-2xl font-black text-indigo-600 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-3xl p-5 shadow">
          <h2 className="text-xl font-black text-gray-700 mb-3">Settings ⚙️</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{settings.soundEnabled ? '🔊' : '🔇'}</span>
                <span className="font-bold text-gray-600">Sound Effects</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleSound}
                className={`w-14 h-7 rounded-full transition-all ${settings.soundEnabled ? 'bg-indigo-500' : 'bg-gray-200'}`}
              >
                <motion.div
                  animate={{ x: settings.soundEnabled ? 28 : 4 }}
                  className="w-5 h-5 bg-white rounded-full shadow mt-1"
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="pb-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowReset(true)}
            className="w-full bg-red-50 border-2 border-red-200 text-red-500 py-3 rounded-2xl font-bold text-lg"
          >
            Reset All Progress 🗑️
          </motion.button>
        </div>
      </div>

      {/* Reset confirm */}
      <AnimatePresence>
        {showReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setShowReset(false)}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center"
            >
              <span className="text-5xl">⚠️</span>
              <h3 className="text-xl font-black text-gray-700 mt-3">Reset everything?</h3>
              <p className="text-gray-400 mt-2">All XP, badges, and progress will be lost!</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowReset(false)} className="flex-1 bg-gray-100 py-3 rounded-2xl font-bold text-gray-500">
                  Cancel
                </button>
                <button
                  onClick={() => { resetProgress(); setShowReset(false); }}
                  className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-bold"
                >
                  Reset!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
