import { motion } from 'framer-motion';
import { Badge } from '../../types';

interface Props {
  badge: Badge;
  index?: number;
}

export default function BadgeCard({ badge, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
        badge.earned
          ? 'bg-yellow-50 border-yellow-300 shadow'
          : 'bg-gray-50 border-gray-200 opacity-50'
      }`}
    >
      <span className={`text-4xl ${!badge.earned ? 'grayscale' : ''}`}>{badge.icon}</span>
      <p className="text-sm font-bold text-center mt-1 text-gray-700">{badge.title}</p>
      <p className="text-xs text-gray-400 text-center mt-0.5">{badge.description}</p>
      {badge.earned && badge.earnedAt && (
        <p className="text-xs text-yellow-500 mt-1">
          ✓ Earned!
        </p>
      )}
    </motion.div>
  );
}
