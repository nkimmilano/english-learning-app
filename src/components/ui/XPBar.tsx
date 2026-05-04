import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { xpProgressInLevel } from '../../utils/storage';

export default function XPBar() {
  const { xp, level } = useGame();
  const progress = xpProgressInLevel(xp);

  return (
    <div className="flex items-center gap-3 rounded-2xl px-4 py-2"
      style={{ background: '#12121a', border: '1px solid rgba(0,245,255,0.18)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg font-orbitron"
        style={{ background: 'rgba(0,245,255,0.15)', color: '#00f5ff', border: '1px solid rgba(0,245,255,0.4)' }}>
        {level}
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1" style={{ color: '#6b6b9a' }}>
          <span>Level {level}</span>
          <span style={{ color: '#00f5ff', fontFamily: 'monospace' }}>{progress}/100 XP</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,245,255,0.08)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00f5ff, #b400ff)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
