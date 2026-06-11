import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

export default function MemoryMashup({ drill, onAnswer }: Props) {
  const words = drill.words ?? drill.correctAnswer.split(' ');
  const sentence = drill.correctAnswer;

  // Shuffle word tiles for display
  const [shuffled] = useState<string[]>(() => {
    const arr = [...words];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  const [available, setAvailable] = useState<{ word: string; id: number }[]>(
    () => shuffled.map((w, i) => ({ word: w, id: i }))
  );
  const [chosen, setChosen] = useState<{ word: string; id: number }[]>([]);
  const [phase, setPhase] = useState<'listen' | 'build' | 'result'>('listen');
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

  const speak = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(sentence);
    utt.rate = 0.85;
    utt.lang = 'en-US';
    window.speechSynthesis.speak(utt);
    setHasSpoken(true);
  }, [sentence]);

  // Auto-speak on mount
  useEffect(() => {
    const t = setTimeout(() => speak(), 600);
    return () => clearTimeout(t);
  }, [speak]);

  function pickWord(item: { word: string; id: number }) {
    setAvailable((a) => a.filter((x) => x.id !== item.id));
    setChosen((c) => [...c, item]);
  }

  function removeWord(item: { word: string; id: number }) {
    setChosen((c) => c.filter((x) => x.id !== item.id));
    setAvailable((a) => [...a, item]);
  }

  function checkAnswer() {
    const attempt = chosen.map((x) => x.word).join(' ');
    const correct = attempt.trim() === sentence.trim();
    setIsCorrect(correct);
    setPhase('result');
    setTimeout(() => onAnswer(correct), 1400);
  }

  function reset() {
    setChosen([]);
    setAvailable(shuffled.map((w, i) => ({ word: w, id: i })));
    setPhase('build');
  }

  const btnBase: React.CSSProperties = {
    background: '#1a1a2e',
    border: '1.5px solid rgba(255,100,0,0.35)',
    color: '#e0e0ff',
    borderRadius: '12px',
    padding: '8px 14px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontFamily: 'inherit',
  };

  if (phase === 'listen') {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        <div
          className="px-3 py-1 rounded-full text-sm font-bold font-orbitron"
          style={{ background: 'rgba(255,100,0,0.12)', color: '#ff6400', border: '1px solid rgba(255,100,0,0.35)' }}
        >
          🧠 Memory Mashup
        </div>

        <p className="text-lg text-center font-semibold" style={{ color: '#b0b0d0' }}>
          Listen carefully, then rebuild the sentence from the word blocks.
        </p>

        {/* Big speaker button */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={speak}
          className="flex flex-col items-center gap-2 rounded-3xl p-8"
          style={{
            background: 'rgba(255,100,0,0.08)',
            border: '2px solid rgba(255,100,0,0.4)',
            boxShadow: '0 0 30px rgba(255,100,0,0.15)',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '4rem' }}>🔊</span>
          <span className="font-bold font-orbitron text-sm" style={{ color: '#ff6400' }}>
            {hasSpoken ? 'Hear Again' : 'Listen'}
          </span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setPhase('build')}
          disabled={!hasSpoken}
          className="py-3 px-8 rounded-2xl font-black text-lg w-full"
          style={{
            background: hasSpoken ? 'rgba(0,245,255,0.1)' : 'rgba(255,255,255,0.03)',
            border: `2px solid ${hasSpoken ? '#00f5ff' : 'rgba(255,255,255,0.1)'}`,
            color: hasSpoken ? '#00f5ff' : '#444',
            cursor: hasSpoken ? 'pointer' : 'not-allowed',
            boxShadow: hasSpoken ? '0 0 20px rgba(0,245,255,0.2)' : 'none',
          }}
        >
          Build the Sentence →
        </motion.button>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-4 rounded-3xl p-8 w-full max-w-lg text-center"
        style={{
          background: '#12121a',
          border: `2px solid ${isCorrect ? '#00ff88' : '#ff0080'}`,
          boxShadow: `0 0 40px ${isCorrect ? 'rgba(0,255,136,0.2)' : 'rgba(255,0,128,0.2)'}`,
        }}
      >
        <span style={{ fontSize: '4rem' }}>{isCorrect ? '🌟' : '💪'}</span>
        <p className="text-2xl font-black font-orbitron" style={{ color: isCorrect ? '#00ff88' : '#ff0080' }}>
          {isCorrect ? 'Perfect!' : 'Not quite!'}
        </p>
        {!isCorrect && (
          <div className="rounded-2xl p-3 w-full" style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)' }}>
            <p className="text-sm mb-1" style={{ color: '#6b6b9a' }}>Correct sentence:</p>
            <p className="font-bold text-base" style={{ color: '#00f5ff' }}>{sentence}</p>
          </div>
        )}
      </motion.div>
    );
  }

  // phase === 'build'
  const builtSentence = chosen.map((x) => x.word).join(' ');

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <div className="flex items-center justify-between">
        <div
          className="px-3 py-1 rounded-full text-sm font-bold font-orbitron"
          style={{ background: 'rgba(255,100,0,0.12)', color: '#ff6400', border: '1px solid rgba(255,100,0,0.35)' }}
        >
          🧠 Memory Mashup
        </div>
        <button
          onClick={speak}
          style={{ ...btnBase, padding: '6px 12px', fontSize: '0.85rem' }}
        >
          🔊 Hear Again
        </button>
      </div>

      {/* Answer tray */}
      <div
        className="min-h-16 rounded-2xl p-3 flex flex-wrap gap-2 items-start"
        style={{ background: 'rgba(0,245,255,0.04)', border: '2px dashed rgba(0,245,255,0.25)' }}
      >
        {chosen.length === 0 && (
          <p className="text-sm w-full text-center" style={{ color: '#444' }}>
            Tap words below to build the sentence
          </p>
        )}
        <AnimatePresence>
          {chosen.map((item) => (
            <motion.button
              key={item.id}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => removeWord(item)}
              style={{
                ...btnBase,
                background: 'rgba(0,245,255,0.12)',
                border: '1.5px solid rgba(0,245,255,0.5)',
                color: '#00f5ff',
              }}
            >
              {item.word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {builtSentence && (
        <p className="text-xs text-center" style={{ color: '#6b6b9a' }}>
          Tap a word above to remove it
        </p>
      )}

      {/* Word bank */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {available.map((item) => (
            <motion.button
              key={item.id}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => pickWord(item)}
              style={btnBase}
            >
              {item.word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button onClick={reset} style={{ ...btnBase, flex: 1 }}>
          ↺ Reset
        </button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={checkAnswer}
          disabled={chosen.length === 0}
          style={{
            ...btnBase,
            flex: 2,
            background: chosen.length > 0 ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.03)',
            border: `2px solid ${chosen.length > 0 ? '#00ff88' : 'rgba(255,255,255,0.1)'}`,
            color: chosen.length > 0 ? '#00ff88' : '#444',
            fontSize: '1.1rem',
            cursor: chosen.length > 0 ? 'pointer' : 'not-allowed',
          }}
        >
          Check ✓
        </motion.button>
      </div>
    </div>
  );
}
