import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { LESSONS } from '../data/lessons';

const PASSWORD = 'teacher';

export default function TeacherMode() {
  const navigate = useNavigate();
  const { settings, unlockTeacherMode, lessonProgress, xp, level, streakDays, badges } = useGame();
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  function tryUnlock() {
    if (input === PASSWORD) {
      unlockTeacherMode();
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  }

  if (!settings.teacherModeUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: '#0a0a0f' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="rounded-3xl p-8 max-w-sm w-full text-center"
          style={{ background: '#12121a', border: '2px solid #00f5ff', boxShadow: '0 0 30px rgba(0,245,255,0.15)' }}
        >
          <span className="text-6xl">🔐</span>
          <h2 className="text-2xl font-black font-orbitron mt-4" style={{ color: '#00f5ff' }}>
            Teacher Mode
          </h2>
          <p className="mt-2" style={{ color: '#6b6b9a' }}>Enter the teacher password to continue</p>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && tryUnlock()}
            placeholder="Password..."
            className="w-full mt-4 rounded-2xl px-4 py-3 text-xl text-center focus:outline-none"
            style={{ background: '#1a1a2e', border: '2px solid rgba(0,245,255,0.3)', color: '#e0e0ff' }}
          />
          {error && <p className="text-sm mt-2" style={{ color: '#ff0080' }}>Wrong password! Try again.</p>}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded-2xl font-bold"
              style={{ background: '#1a1a2e', color: '#6b6b9a' }}
            >
              Back
            </button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={tryUnlock}
              className="flex-1 py-3 rounded-2xl font-bold cyber-btn"
            >
              Unlock
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const earnedBadges = badges.filter(b => b.earned);
  const completedLessons = LESSONS.filter(l => lessonProgress[l.id]?.completed);

  return (
    <div className="min-h-screen pb-8" style={{ background: '#0a0a0f' }}>
      <div className="px-4 pt-8 pb-6 flex items-center gap-3"
        style={{ background: '#12121a', borderBottom: '1px solid rgba(0,245,255,0.15)' }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="rounded-xl p-2 text-xl"
          style={{ background: 'rgba(0,245,255,0.1)', color: '#00f5ff' }}
        >
          ←
        </motion.button>
        <div>
          <h1 className="text-2xl font-black font-orbitron" style={{ color: '#00f5ff' }}>
            Teacher Mode 📊
          </h1>
          <p className="text-sm" style={{ color: '#6b6b9a' }}>Detailed progress overview</p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* Summary */}
        <div className="cyber-card p-5">
          <h2 className="font-black text-lg font-orbitron mb-3" style={{ color: '#e0e0ff' }}>
            Overall Summary
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {([
              ['Total XP', xp],
              ['Level', level],
              ['Streak Days', streakDays],
              ['Lessons Completed', completedLessons.length],
              ['Badges Earned', earnedBadges.length],
              ['Total Lessons', LESSONS.length],
            ] as [string, number][]).map(([label, value]) => (
              <div key={label} className="rounded-2xl p-3"
                style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.12)' }}>
                <p className="text-xl font-black font-orbitron" style={{ color: '#00f5ff' }}>{value}</p>
                <p className="text-xs" style={{ color: '#6b6b9a' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson breakdown */}
        <div className="cyber-card p-5">
          <h2 className="font-black text-lg font-orbitron mb-3" style={{ color: '#e0e0ff' }}>
            Lesson Progress
          </h2>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {LESSONS.map(lesson => {
              const prog = lessonProgress[lesson.id];
              return (
                <div key={lesson.id} className="flex items-center gap-3 rounded-2xl p-3"
                  style={{ background: '#1a1a2e' }}>
                  <span className="text-2xl">{lesson.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate" style={{ color: '#e0e0ff' }}>{lesson.title}</p>
                    <p className="text-xs" style={{ color: '#6b6b9a' }}>
                      {lesson.zone.toUpperCase()} · {lesson.category}
                    </p>
                    {prog && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                          style={{ background: 'rgba(0,245,255,0.1)' }}>
                          <div className="h-full rounded-full"
                            style={{ width: `${prog.bestScore}%`, background: '#00f5ff' }} />
                        </div>
                        <span className="text-xs font-mono" style={{ color: '#6b6b9a' }}>{prog.bestScore}%</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {prog?.completed
                      ? <span className="text-lg" style={{ color: '#00ff88' }}>✓</span>
                      : <span className="text-lg" style={{ color: '#6b6b9a' }}>○</span>}
                    {prog && <p className="text-xs" style={{ color: '#6b6b9a' }}>{prog.attemptsCount}×</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drill type performance */}
        <div className="cyber-card p-5">
          <h2 className="font-black text-lg font-orbitron mb-3" style={{ color: '#e0e0ff' }}>
            Drill Types Encountered
          </h2>
          {(() => {
            const allSeen = new Set(Object.values(lessonProgress).flatMap(p => p.drillTypesSeen));
            const allTypes: import('../types').DrillType[] = [
              'fill-blank', 'word-image', 'hangman', 'scramble', 'sentence-builder',
              'listening', 'quiz', 'clock', 'reading-comprehension', 'homophone',
            ];
            const labels: Record<string, string> = {
              'fill-blank': 'Fill in the Blank',
              'word-image': 'Word Match',
              'hangman': 'Rocket Spelling',
              'scramble': 'Word Scramble',
              'sentence-builder': 'Sentence Builder',
              'listening': 'Listening',
              'quiz': 'Quick Quiz',
              'clock': 'Tell the Time',
              'reading-comprehension': 'Reading Comprehension',
              'homophone': 'Homophones',
            };
            return (
              <div className="space-y-2">
                {allTypes.map(t => (
                  <div key={t} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#e0e0ff' }}>{labels[t]}</span>
                    <span className="text-sm font-bold"
                      style={{ color: allSeen.has(t) ? '#00ff88' : '#6b6b9a' }}>
                      {allSeen.has(t) ? '✓ Tried' : 'Not yet'}
                    </span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Badges */}
        <div className="cyber-card p-5">
          <h2 className="font-black text-lg font-orbitron mb-3" style={{ color: '#e0e0ff' }}>
            Badges Earned ({earnedBadges.length})
          </h2>
          {earnedBadges.length === 0 ? (
            <p style={{ color: '#6b6b9a' }}>No badges yet — keep going!</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {earnedBadges.map(b => (
                <div key={b.id} className="flex items-center gap-1 rounded-xl px-3 py-1"
                  style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.25)' }}>
                  <span>{b.icon}</span>
                  <span className="text-sm font-bold" style={{ color: '#00ff88' }}>{b.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
