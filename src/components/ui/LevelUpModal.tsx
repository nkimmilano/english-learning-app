import { motion, AnimatePresence } from 'framer-motion';
import Confetti from '../layout/Confetti';

interface Props {
  level: number;
  onClose: () => void;
}

export default function LevelUpModal({ level, onClose }: Props) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
        <Confetti count={60} />
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={e => e.stopPropagation()}
          className="rounded-3xl p-10 flex flex-col items-center gap-4 max-w-sm w-full mx-4"
          style={{
            background: '#12121a',
            border: '2px solid #b400ff',
            boxShadow: '0 0 40px rgba(180,0,255,0.4)',
          }}
        >
          <motion.div
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }}
            transition={{ repeat: 2, duration: 0.5 }}
            className="text-8xl"
          >
            🏆
          </motion.div>
          <h2 className="text-4xl font-black font-orbitron" style={{ color: '#b400ff' }}>LEVEL UP!</h2>
          <p className="text-6xl font-black font-orbitron" style={{ color: '#00f5ff' }}>{level}</p>
          <p className="text-xl text-center" style={{ color: '#e0e0ff' }}>Amazing! You reached Level {level}!</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-8 py-3 rounded-2xl text-xl font-bold mt-2 cyber-btn"
          >
            Keep going! 🚀
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
