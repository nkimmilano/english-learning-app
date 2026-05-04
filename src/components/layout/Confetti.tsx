import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  rotation: number;
}

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];
const EMOJIS = ['⭐', '🌟', '✨', '🎉', '🎊', '💫'];

export default function Confetti({ count = 40 }: { count?: number }) {
  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[i % COLORS.length],
    delay: Math.random() * 0.5,
    size: 8 + Math.random() * 16,
    rotation: Math.random() * 720 - 360,
  }));

  const emojis = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    emoji: EMOJIS[i % EMOJIS.length],
    delay: Math.random() * 0.4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: '-5vh', rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: p.rotation, opacity: [1, 1, 0] }}
          transition={{ duration: 1.5 + Math.random(), delay: p.delay, ease: 'easeIn' }}
          className="absolute top-0"
          style={{ left: 0, width: p.size, height: p.size, backgroundColor: p.color, borderRadius: '2px' }}
        />
      ))}
      {emojis.map(e => (
        <motion.div
          key={`e${e.id}`}
          initial={{ x: `${e.x}vw`, y: '-5vh', scale: 0 }}
          animate={{ y: '60vh', scale: [0, 1.5, 1], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 1, delay: e.delay + 0.2 }}
          className="absolute top-0 text-4xl"
          style={{ left: 0 }}
        >
          {e.emoji}
        </motion.div>
      ))}
    </div>
  );
}
