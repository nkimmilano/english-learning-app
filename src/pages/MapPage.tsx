import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { LESSONS } from '../data/lessons';
import BottomNav from '../components/layout/BottomNav';
import XPBar from '../components/ui/XPBar';
import { Zone } from '../types';

const ZONE_META: Record<Zone, { label: string; emoji: string; color: string; bg: string }> = {
  a1:     { label: 'Zone 1 — A1 Foundations', emoji: '🌱', color: 'text-green-600',  bg: 'bg-green-50 border-green-200' },
  a1plus: { label: 'Zone 2 — A1+ Bridge',     emoji: '🌿', color: 'text-blue-600',   bg: 'bg-blue-50 border-blue-200' },
  a2:     { label: 'Zone 3 — A2 Explorer',    emoji: '🌳', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
  b1:     { label: 'Zone 4 — B1 Challenger',  emoji: '🏔️', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
  b2:     { label: 'Zone 5 — B2 Advanced',    emoji: '🚀', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
};

const ZONE_ORDER: Zone[] = ['a1', 'a1plus', 'a2', 'b1', 'b2'];

export default function MapPage() {
  const navigate = useNavigate();
  const { profile, xp, lessonProgress, streakDays } = useGame();

  function isCompleted(id: string) {
    return lessonProgress[id]?.completed ?? false;
  }

  function getBestScore(id: string) {
    return lessonProgress[id]?.bestScore ?? 0;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-indigo-100 pb-24">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur sticky top-0 z-10 px-4 pt-6 pb-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{profile?.avatarEmoji ?? '🦊'}</span>
            <div>
              <p className="font-black text-xl text-gray-800">{profile?.nickname ?? 'Explorer'}</p>
              <p className="text-sm text-gray-500">{xp} XP total</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-2xl px-3 py-2">
            <span className="text-2xl">🔥</span>
            <span className="font-black text-orange-500 text-xl">{streakDays}</span>
            <span className="text-sm text-orange-400">streak</span>
          </div>
        </div>
        <XPBar />
      </div>

      <div className="px-4 pt-4 space-y-6">
        <h1 className="text-3xl font-black text-indigo-700 text-center">Your Learning Map 🗺️</h1>

        {ZONE_ORDER.map(zone => {
          const zoneLessons = LESSONS.filter(l => l.zone === zone);
          const meta = ZONE_META[zone];
          const completedCount = zoneLessons.filter(l => isCompleted(l.id)).length;

          return (
            <div key={zone} className={`rounded-3xl border-2 ${meta.bg} p-4`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">{meta.emoji}</span>
                <div>
                  <h2 className={`text-xl font-black ${meta.color}`}>{meta.label}</h2>
                  <p className="text-sm text-gray-500">{completedCount}/{zoneLessons.length} completed</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {zoneLessons.map((lesson, i) => {
                  const completed = isCompleted(lesson.id);
                  const score = getBestScore(lesson.id);

                  return (
                    <motion.button
                      key={lesson.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/lesson/${lesson.id}`)}
                      className={`relative rounded-2xl p-4 text-left transition-all shadow-sm ${
                        completed
                          ? `bg-gradient-to-br ${lesson.color} text-white shadow-md`
                          : 'bg-white border-2 border-gray-100'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-3xl">{lesson.icon}</span>
                        {completed && <span className="text-xl">⭐</span>}
                      </div>
                      <p className={`font-bold mt-2 text-base ${completed ? 'text-white' : 'text-gray-700'}`}>
                        {lesson.title}
                      </p>
                      <p className={`text-xs mt-0.5 ${completed ? 'text-white/80' : 'text-gray-400'}`}>
                        {lesson.category}
                      </p>
                      {completed && score > 0 && (
                        <div className="mt-2 flex items-center gap-1">
                          <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full" style={{ width: `${score}%` }} />
                          </div>
                          <span className="text-xs text-white/80">{score}%</span>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
}
