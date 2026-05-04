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
    const tiles = words.map((w, i) => ({ id: i, word: w }));
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
      <p className="text-2xl font-bold text-center" style={{ color: '#e0e0ff' }}>{drill.question}</p>

      {/* Built sentence zone */}
      <div className="min-h-[70px] rounded-2xl px-4 py-3 w-full max-w-xl flex flex-wrap gap-2 items-center justify-center"
        style={{
          background: 'rgba(0,255,136,0.05)',
          border: '2px solid rgba(0,255,136,0.25)',
        }}>
        {built.length === 0 && (
          <span className="text-lg" style={{ color: '#6b6b9a' }}>Build your sentence here...</span>
        )}
        {built.map(tile => (
          <motion.button
            key={tile.id}
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => unpick(tile)}
            className="px-3 py-2 rounded-xl text-lg font-bold"
            style={{ background: 'rgba(0,255,136,0.15)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.4)' }}
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
            className="px-3 py-2 rounded-xl text-lg font-bold"
            style={{
              background: 'rgba(0,245,255,0.08)',
              border: '1px solid rgba(0,245,255,0.3)',
              color: '#00f5ff',
            }}
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
          className="px-8 py-3 rounded-2xl text-xl font-bold cyber-btn"
        >
          Check ✓
        </motion.button>
      )}

      <AnimatePresence>
        {done && result !== null && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xl font-bold text-center font-orbitron"
            style={{ color: result ? '#00ff88' : '#ff0080' }}
          >
            {result ? '✓ Perfect sentence!' : `Answer: "${words.join(' ')}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
