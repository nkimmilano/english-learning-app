import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
        >
          <span className="text-6xl">🔐</span>
          <h2 className="text-2xl font-black text-gray-700 mt-4">Teacher Mode</h2>
          <p className="text-gray-400 mt-2">Enter the teacher password to continue</p>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && tryUnlock()}
            placeholder="Password..."
            className="w-full mt-4 border-2 border-gray-200 rounded-2xl px-4 py-3 text-xl text-center focus:outline-none focus:border-indigo-400"
          />
          {error && <p className="text-red-500 text-sm mt-2">Wrong password! Try again.</p>}
          <div className="flex gap-3 mt-4">
            <button onClick={() => navigate(-1)} className="flex-1 bg-gray-100 py-3 rounded-2xl font-bold text-gray-500">
              Back
            </button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={tryUnlock}
              className="flex-1 bg-indigo-500 text-white py-3 rounded-2xl font-bold"
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
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="bg-gray-800 px-4 pt-8 pb-6 text-white flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="bg-white/20 rounded-xl p-2 text-xl"
        >
          ←
        </motion.button>
        <div>
          <h1 className="text-2xl font-black">Teacher Mode 📊</h1>
          <p className="text-gray-400 text-sm">Detailed progress overview</p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* Summary */}
        <div className="bg-white rounded-3xl p-5 shadow">
          <h2 className="font-black text-lg text-gray-700 mb-3">Overall Summary</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Total XP', xp],
              ['Level', level],
              ['Streak Days', streakDays],
              ['Lessons Completed', completedLessons.length],
              ['Badges Earned', earnedBadges.length],
              ['Total Lessons', LESSONS.length],
            ].map(([label, value]) => (
              <div key={label as string} className="bg-indigo-50 rounded-2xl p-3">
                <p className="text-xl font-black text-indigo-600">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson breakdown */}
        <div className="bg-white rounded-3xl p-5 shadow">
          <h2 className="font-black text-lg text-gray-700 mb-3">Lesson Progress</h2>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {LESSONS.map(lesson => {
              const prog = lessonProgress[lesson.id];
              return (
                <div key={lesson.id} className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
                  <span className="text-2xl">{lesson.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-700 truncate">{lesson.title}</p>
                    <p className="text-xs text-gray-400">{lesson.zone.toUpperCase()} · {lesson.category}</p>
                    {prog && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${prog.bestScore}%` }} />
                        </div>
                        <span className="text-xs text-gray-500">{prog.bestScore}%</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {prog?.completed ? <span className="text-green-500 text-lg">✓</span> : <span className="text-gray-300 text-lg">○</span>}
                    {prog && <p className="text-xs text-gray-400">{prog.attemptsCount}×</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drill type performance */}
        <div className="bg-white rounded-3xl p-5 shadow">
          <h2 className="font-black text-lg text-gray-700 mb-3">Drill Types Encountered</h2>
          {(() => {
            const allSeen = new Set(Object.values(lessonProgress).flatMap(p => p.drillTypesSeen));
            const allTypes: import('../types').DrillType[] = ['fill-blank', 'word-image', 'hangman', 'scramble', 'sentence-builder', 'listening', 'quiz', 'clock'];
            const labels: Record<string, string> = {
              'fill-blank': 'Fill in the Blank',
              'word-image': 'Word Match',
              'hangman': 'Rocket Spelling',
              'scramble': 'Word Scramble',
              'sentence-builder': 'Sentence Builder',
              'listening': 'Listening',
              'quiz': 'Quick Quiz',
              'clock': 'Tell the Time',
            };
            return (
              <div className="space-y-2">
                {allTypes.map(t => (
                  <div key={t} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{labels[t]}</span>
                    <span className={`text-sm font-bold ${allSeen.has(t) ? 'text-green-500' : 'text-gray-300'}`}>
                      {allSeen.has(t) ? '✓ Tried' : 'Not yet'}
                    </span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Badges */}
        <div className="bg-white rounded-3xl p-5 shadow">
          <h2 className="font-black text-lg text-gray-700 mb-3">Badges Earned ({earnedBadges.length})</h2>
          {earnedBadges.length === 0 ? (
            <p className="text-gray-400">No badges yet — keep going!</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {earnedBadges.map(b => (
                <div key={b.id} className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1">
                  <span>{b.icon}</span>
                  <span className="text-sm font-bold text-yellow-700">{b.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
