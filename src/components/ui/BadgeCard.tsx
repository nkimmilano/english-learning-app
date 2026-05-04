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
      className="flex flex-col items-center p-4 rounded-2xl transition-all"
      style={badge.earned ? {
        background: 'rgba(0,255,136,0.07)',
        border: '1px solid rgba(0,255,136,0.4)',
        boxShadow: '0 0 12px rgba(0,255,136,0.12)',
      } : {
        background: '#12121a',
        border: '1px solid rgba(107,107,154,0.25)',
        opacity: 0.55,
      }}
    >
      <span className={`text-4xl ${!badge.earned ? 'grayscale' : ''}`}>{badge.icon}</span>
      <p className="text-sm font-bold text-center mt-1" style={{ color: badge.earned ? '#e0e0ff' : '#6b6b9a' }}>
        {badge.title}
      </p>
      <p className="text-xs text-center mt-0.5" style={{ color: '#6b6b9a' }}>{badge.description}</p>
      {badge.earned && (
        <p className="text-xs mt-1 font-bold" style={{ color: '#00ff88' }}>✓ Earned!</p>
      )}
    </motion.div>
  );
}
