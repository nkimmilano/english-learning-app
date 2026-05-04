import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

interface Tile { id: number; word: string }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SentenceBuilder({ drill, onAnswer }: Props) {
  const words = drill.words ?? drill.correctAnswer.split(' ');
  const [pool, setPool] = useState<Tile[]>([]);
  const [built, setBuilt] = useState<Tile[]>([]);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    let tiles = words.map((w, i) => ({ id: i, word: w }));
    let shuffled = shuffle(tiles);
    while (shuffled.map(t => t.word).join(' ') === words.join(' ')) {
      shuffled = shuffle(tiles);
    }
    setPool(shuffled);
  }, []);

  function pick(tile: Tile) {
    if (done) return;
    setPool(p => p.filter(t => t.id !== tile.id));
    setBuilt(b => [...b, tile]);
  }

  function unpick(tile: Tile) {
    if (done) return;
    setBuilt(b => b.filter(t => t.id !== tile.id));
    setPool(p => [...p, tile]);
  }

  function checkAnswer() {
    const attempt = built.map(t => t.word).join(' ');
    const correct = attempt === words.join(' ');
    setResult(correct);
    setDone(true);
    setTimeout(() => onAnswer(correct), 1200);
  }

  const allPlaced = pool.length === 0;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className="text-2xl font-bold text-gray-600 text-center">{drill.question}</p>

      {/* Built sentence */}
      <div className="min-h-[70px] bg-green-50 border-2 border-green-200 rounded-2xl px-4 py-3 w-full max-w-xl flex flex-wrap gap-2 items-center justify-center">
        {built.length === 0 && <span className="text-gray-400 text-lg">Build your sentence here...</span>}
        {built.map(tile => (
          <motion.button
            key={tile.id}
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => unpick(tile)}
            className="bg-green-400 text-white px-3 py-2 rounded-xl text-lg font-bold shadow"
          >
            {tile.word}
          </motion.button>
        ))}
      </div>

      {/* Word pool */}
      <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
        {pool.map(tile => (
          <motion.button
            key={tile.id}
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => pick(tile)}
            className="bg-white border-2 border-indigo-300 text-indigo-700 px-3 py-2 rounded-xl text-lg font-bold shadow-sm"
          >
            {tile.word}
          </motion.button>
        ))}
      </div>

      {/* Check button */}
      {!done && allPlaced && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkAnswer}
          className="bg-indigo-500 text-white px-8 py-3 rounded-2xl text-xl font-bold shadow-lg"
        >
          Check ✓
        </motion.button>
      )}

      <AnimatePresence>
        {done && result !== null && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-xl font-bold text-center ${result ? 'text-green-500' : 'text-red-500'}`}
          >
            {result ? '🎉 Perfect sentence!' : `Correct: "${words.join(' ')}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
