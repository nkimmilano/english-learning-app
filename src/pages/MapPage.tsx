import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { LESSONS } from '../data/lessons';
import BottomNav from '../components/layout/BottomNav';
import XPBar from '../components/ui/XPBar';
import { Zone } from '../types';

const ZONE_META: Record<Zone, { label: string; emoji: string; neon: string; border: string }> = {
  a1:     { label: 'Zone 1 — A1 Foundations', emoji: '🌱', neon: '#00ff88',  border: 'rgba(0,255,136,0.3)' },
  a1plus: { label: 'Zone 2 — A1+ Bridge',     emoji: '🌿', neon: '#00f5ff',  border: 'rgba(0,245,255,0.3)' },
  a2:     { label: 'Zone 3 — A2 Explorer',    emoji: '🌳', neon: '#b400ff',  border: 'rgba(180,0,255,0.3)' },
  b1:     { label: 'Zone 4 — B1 Challenger',  emoji: '🏔️', neon: '#ff6b00',  border: 'rgba(255,107,0,0.3)' },
  b2:     { label: 'Zone 5 — B2 Advanced',    emoji: '🚀', neon: '#ff0080',  border: 'rgba(255,0,128,0.3)' },
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
    <div className="min-h-screen pb-24 map-grid" style={{ background: '#0a0a0f' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 pt-6 pb-3"
        style={{ background: 'rgba(10,10,15,0.92)', borderBottom: '1px solid rgba(0,245,255,0.12)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{profile?.avatarEmoji ?? '🦊'}</span>
            <div>
              <p className="font-black text-xl" style={{ color: '#e0e0ff' }}>{profile?.nickname ?? 'Explorer'}</p>
              <p className="text-sm font-mono" style={{ color: '#6b6b9a' }}>{xp} XP</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl px-3 py-2"
            style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)' }}>
            <span className="text-2xl">🔥</span>
            <span className="font-black text-xl" style={{ color: '#ff6b00' }}>{streakDays}</span>
            <span className="text-sm" style={{ color: '#ff6b0099' }}>streak</span>
          </div>
        </div>
        <XPBar />
      </div>

      <div className="px-4 pt-4 space-y-6">
        <h1 className="text-3xl font-black font-orbitron text-center" style={{ color: '#00f5ff' }}>
          Your Learning Map 🗺️
        </h1>

        {ZONE_ORDER.map(zone => {
          const zoneLessons = LESSONS.filter(l => l.zone === zone);
          const meta = ZONE_META[zone];
          const completedCount = zoneLessons.filter(l => isCompleted(l.id)).length;

          return (
            <div key={zone} className="rounded-3xl p-4"
              style={{ background: '#12121a', border: `1px solid ${meta.border}` }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">{meta.emoji}</span>
                <div>
                  <h2 className="text-xl font-black font-orbitron" style={{ color: meta.neon }}>
                    {meta.label}
                  </h2>
                  <p className="text-sm" style={{ color: '#6b6b9a' }}>
                    {completedCount}/{zoneLessons.length} completed
                  </p>
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
                      className="relative rounded-2xl p-4 text-left transition-all"
                      style={completed ? {
                        background: `linear-gradient(135deg, ${meta.neon}22, ${meta.neon}11)`,
                        border: `1px solid ${meta.neon}66`,
                        boxShadow: `0 0 16px ${meta.neon}22`,
                      } : {
                        background: '#1a1a2e',
                        border: '1px solid rgba(107,107,154,0.2)',
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-3xl">{lesson.icon}</span>
                        {completed && (
                          <span className="text-sm font-bold" style={{ color: meta.neon }}>✓</span>
                        )}
                      </div>
                      <p className="font-bold mt-2 text-base" style={{ color: '#e0e0ff' }}>
                        {lesson.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#6b6b9a' }}>
                        {lesson.category}
                      </p>
                      {completed && score > 0 && (
                        <div className="mt-2 flex items-center gap-1">
                          <div className="flex-1 h-1 rounded-full overflow-hidden"
                            style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <div className="h-full rounded-full" style={{
                              width: `${score}%`,
                              background: meta.neon,
                            }} />
                          </div>
                          <span className="text-xs font-mono" style={{ color: meta.neon }}>{score}%</span>
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
