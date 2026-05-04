import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { LESSONS } from '../data/lessons';
import BottomNav from '../components/layout/BottomNav';
import XPBar from '../components/ui/XPBar';
import BadgeCard from '../components/ui/BadgeCard';

const CEFR_LEVELS = [
  { label: 'A1',  minXP: 0,   neon: '#00ff88' },
  { label: 'A1+', minXP: 150, neon: '#00f5ff' },
  { label: 'A2',  minXP: 350, neon: '#b400ff' },
  { label: 'B1',  minXP: 550, neon: '#ff6b00' },
  { label: 'B2',  minXP: 800, neon: '#ff0080' },
];

export default function ProfilePage() {
  const { profile, xp, level, streakDays, badges, lessonProgress, settings, toggleSound, resetProgress } = useGame();
  const [showReset, setShowReset] = useState(false);

  const completedCount = Object.values(lessonProgress).filter(p => p.completed).length;
  const earnedBadges = badges.filter(b => b.earned).length;

  const cefrIndex = [...CEFR_LEVELS].reverse().findIndex(c => xp >= c.minXP);
  const resolvedCefrIndex = cefrIndex === -1 ? 0 : CEFR_LEVELS.length - 1 - cefrIndex;
  const nextLevel = CEFR_LEVELS[resolvedCefrIndex + 1];
  const cefrPercent = nextLevel
    ? ((xp - CEFR_LEVELS[resolvedCefrIndex].minXP) / (nextLevel.minXP - CEFR_LEVELS[resolvedCefrIndex].minXP)) * 100
    : 100;

  // suppress unused variable warning
  void LESSONS;

  const statItems = [
    { label: 'Lessons Done',  value: completedCount, icon: '📚' },
    { label: 'Badges Earned', value: earnedBadges,   icon: '🏅' },
    { label: 'Day Streak',    value: streakDays,      icon: '🔥' },
    { label: 'My Level',      value: `Lv ${level}`,  icon: '⚡' },
  ];

  return (
    <div className="min-h-screen pb-28" style={{ background: '#0a0a0f' }}>
      {/* Hero */}
      <div className="px-4 pt-10 pb-8 text-center relative overflow-hidden scanline"
        style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)' }}>
        {/* top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #b400ff, transparent)' }} />
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
          className="text-8xl mb-3"
        >
          {profile?.avatarEmoji ?? '🦊'}
        </motion.div>
        <h1 className="text-3xl font-black font-orbitron" style={{ color: '#e0e0ff' }}>
          {profile?.nickname ?? 'Explorer'}
        </h1>
        <p className="mt-1" style={{ color: '#6b6b9a' }}>Level {level} English Learner</p>
        <div className="flex justify-center gap-8 mt-4">
          {[
            { val: xp,         label: 'Total XP' },
            { val: `🔥 ${streakDays}`, label: 'Day Streak' },
            { val: completedCount, label: 'Lessons' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-black font-orbitron" style={{ color: '#00f5ff' }}>{item.val}</p>
              <p className="text-sm" style={{ color: '#6b6b9a' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5">
        <XPBar />

        {/* CEFR Progress */}
        <div className="cyber-card p-5">
          <h2 className="text-xl font-black font-orbitron mb-3" style={{ color: '#e0e0ff' }}>CEFR Journey 📈</h2>
          <div className="flex items-center gap-2 mb-3">
            {CEFR_LEVELS.map((c, i) => (
              <div key={c.label} className="flex items-center gap-1 flex-1">
                <div className="flex-1 h-3 rounded-full transition-all overflow-hidden"
                  style={{ background: i <= resolvedCefrIndex ? c.neon + '33' : 'rgba(107,107,154,0.15)',
                           border: `1px solid ${i <= resolvedCefrIndex ? c.neon : 'rgba(107,107,154,0.2)'}` }}>
                  {i <= resolvedCefrIndex && (
                    <div className="h-full rounded-full" style={{ background: c.neon, width: i < resolvedCefrIndex ? '100%' : `${cefrPercent}%` }} />
                  )}
                </div>
                <span className="text-xs font-bold font-orbitron"
                  style={{ color: i <= resolvedCefrIndex ? c.neon : '#6b6b9a' }}>{c.label}</span>
              </div>
            ))}
          </div>
          <p className="text-sm" style={{ color: '#6b6b9a' }}>
            Currently at{' '}
            <strong style={{ color: CEFR_LEVELS[resolvedCefrIndex]?.neon }}>
              {CEFR_LEVELS[resolvedCefrIndex]?.label}
            </strong>
            {' '}· {Math.round(cefrPercent)}% to next level
          </p>
        </div>

        {/* Badges */}
        <div className="cyber-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-black font-orbitron" style={{ color: '#e0e0ff' }}>Badges 🏅</h2>
            <span className="text-sm font-mono" style={{ color: '#6b6b9a' }}>{earnedBadges}/{badges.length}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {badges.map((badge, i) => (
              <BadgeCard key={badge.id} badge={badge} index={i} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="cyber-card p-5">
          <h2 className="text-xl font-black font-orbitron mb-3" style={{ color: '#e0e0ff' }}>My Stats 📊</h2>
          <div className="grid grid-cols-2 gap-3">
            {statItems.map(stat => (
              <div key={stat.label} className="rounded-2xl p-3 text-center"
                style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.12)' }}>
                <span className="text-3xl">{stat.icon}</span>
                <p className="text-2xl font-black font-orbitron mt-1" style={{ color: '#00f5ff' }}>{stat.value}</p>
                <p className="text-xs" style={{ color: '#6b6b9a' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="cyber-card p-5">
          <h2 className="text-xl font-black font-orbitron mb-3" style={{ color: '#e0e0ff' }}>Settings ⚙️</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{settings.soundEnabled ? '🔊' : '🔇'}</span>
              <span className="font-bold" style={{ color: '#e0e0ff' }}>Sound Effects</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleSound}
              className="w-14 h-7 rounded-full transition-all relative"
              style={{
                background: settings.soundEnabled ? '#00f5ff33' : '#1a1a2e',
                border: `2px solid ${settings.soundEnabled ? '#00f5ff' : 'rgba(107,107,154,0.3)'}`,
              }}
            >
              <motion.div
                animate={{ x: settings.soundEnabled ? 28 : 4 }}
                className="absolute top-0.5 w-4 h-4 rounded-full"
                style={{ background: settings.soundEnabled ? '#00f5ff' : '#6b6b9a' }}
              />
            </motion.button>
          </div>
        </div>

        {/* Reset */}
        <div className="pb-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowReset(true)}
            className="w-full py-3 rounded-2xl font-bold text-lg"
            style={{ background: 'rgba(255,0,128,0.08)', border: '1px solid rgba(255,0,128,0.3)', color: '#ff0080' }}
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
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
            onClick={() => setShowReset(false)}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={e => e.stopPropagation()}
              className="rounded-3xl p-6 max-w-sm w-full text-center"
              style={{ background: '#12121a', border: '2px solid #ff0080', boxShadow: '0 0 30px rgba(255,0,128,0.3)' }}
            >
              <span className="text-5xl">⚠️</span>
              <h3 className="text-xl font-black font-orbitron mt-3" style={{ color: '#e0e0ff' }}>
                Reset everything?
              </h3>
              <p className="mt-2" style={{ color: '#6b6b9a' }}>All XP, badges, and progress will be lost!</p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowReset(false)}
                  className="flex-1 py-3 rounded-2xl font-bold"
                  style={{ background: '#1a1a2e', color: '#6b6b9a', border: '1px solid rgba(107,107,154,0.3)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => { resetProgress(); setShowReset(false); }}
                  className="flex-1 py-3 rounded-2xl font-bold"
                  style={{ background: '#ff008033', color: '#ff0080', border: '2px solid #ff0080' }}
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
