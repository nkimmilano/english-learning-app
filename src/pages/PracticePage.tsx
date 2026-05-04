import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LESSONS } from '../data/lessons';
import { useGame } from '../contexts/GameContext';
import BottomNav from '../components/layout/BottomNav';

export default function PracticePage() {
  const navigate = useNavigate();
  const { xp, lessonProgress } = useGame();

  const available = LESSONS.filter(l => xp >= l.requiredXP);
  const recent = available
    .filter(l => lessonProgress[l.id])
    .sort((a, b) => (lessonProgress[b.id]?.lastPlayed ?? 0) - (lessonProgress[a.id]?.lastPlayed ?? 0))
    .slice(0, 4);

  const notStarted = available.filter(l => !lessonProgress[l.id]?.completed).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 pb-24">
      <div className="px-4 pt-8 pb-4">
        <h1 className="text-3xl font-black text-indigo-700 mb-1">Practice 📚</h1>
        <p className="text-gray-400">Keep learning every day!</p>
      </div>

      {recent.length > 0 && (
        <section className="px-4 mb-6">
          <h2 className="text-xl font-black text-gray-600 mb-3">Continue Learning</h2>
          <div className="space-y-3">
            {recent.map((lesson, i) => {
              const prog = lessonProgress[lesson.id];
              return (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                  className={`w-full bg-gradient-to-r ${lesson.color} rounded-2xl p-4 flex items-center gap-4 shadow`}
                >
                  <span className="text-4xl">{lesson.icon}</span>
                  <div className="flex-1 text-left">
                    <p className="font-black text-white text-lg">{lesson.title}</p>
                    <p className="text-white/70 text-sm">{lesson.category}</p>
                    {prog?.bestScore !== undefined && (
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full" style={{ width: `${prog.bestScore}%` }} />
                        </div>
                        <span className="text-xs text-white/80">{prog.bestScore}%</span>
                      </div>
                    )}
                  </div>
                  <span className="text-white text-2xl">▶</span>
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      {notStarted.length > 0 && (
        <section className="px-4">
          <h2 className="text-xl font-black text-gray-600 mb-3">Try Next</h2>
          <div className="grid grid-cols-2 gap-3">
            {notStarted.map((lesson, i) => (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
                className="bg-white border-2 border-gray-100 rounded-2xl p-4 text-left shadow-sm"
              >
                <span className="text-4xl">{lesson.icon}</span>
                <p className="font-bold text-gray-700 mt-2">{lesson.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{lesson.category}</p>
                <p className="text-xs text-indigo-400 mt-1">{lesson.drills.length} exercises</p>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      <BottomNav />
    </div>
  );
}
