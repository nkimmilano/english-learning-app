import { motion, AnimatePresence } from 'framer-motion';
import Confetti from '../layout/Confetti';

interface Props {
  level: number;
  onClose: () => void;
}

export default function LevelUpModal({ level, onClose }: Props) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
        <Confetti count={60} />
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-3xl p-10 flex flex-col items-center gap-4 shadow-2xl max-w-sm w-full mx-4"
        >
          <motion.div
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }}
            transition={{ repeat: 2, duration: 0.5 }}
            className="text-8xl"
          >
            🏆
          </motion.div>
          <h2 className="text-4xl font-black text-indigo-600">LEVEL UP!</h2>
          <p className="text-6xl font-black text-purple-600">{level}</p>
          <p className="text-xl text-gray-500 text-center">Amazing! You reached Level {level}!</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-indigo-500 text-white px-8 py-3 rounded-2xl text-xl font-bold mt-2"
          >
            Keep going! 🚀
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
