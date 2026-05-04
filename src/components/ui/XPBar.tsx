import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { xpProgressInLevel } from '../../utils/storage';

export default function XPBar() {
  const { xp, level } = useGame();
  const progress = xpProgressInLevel(xp);

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 shadow">
      <div className="bg-indigo-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg">
        {level}
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Level {level}</span>
          <span>{progress}/100 XP</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
