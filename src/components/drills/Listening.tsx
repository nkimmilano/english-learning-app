import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

export default function Listening({ drill, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Shuffle once per drill
  const options = useMemo(
    () => shuffleOptions(drill.options ?? []),
    [drill.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    doSpeak();
    return () => window.speechSynthesis.cancel();
  }, []);

  function doSpeak() {
    setSpeaking(true);
    const utt = new SpeechSynthesisUtterance(drill.correctAnswer);
    utt.lang = 'en-US';
    utt.rate = 0.85;
    utt.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  }

  function choose(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    setTimeout(() => onAnswer(opt === drill.correctAnswer), 900);
  }

  const correct = selected === drill.correctAnswer;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex flex-col items-center gap-3">
        {drill.imageEmoji && <span className="text-7xl">{drill.imageEmoji}</span>}
        <p className="text-xl font-bold text-center" style={{ color: '#e0e0ff' }}>{drill.question}</p>
        <motion.button
          animate={speaking ? { scale: [1, 1.15, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.6 }}
          onClick={doSpeak}
          className="px-8 py-4 rounded-2xl text-xl font-bold flex items-center gap-3"
          style={{
            background: speaking ? 'rgba(0,245,255,0.2)' : 'rgba(0,245,255,0.1)',
            border: `2px solid #00f5ff`,
            color: '#00f5ff',
            boxShadow: speaking ? '0 0 20px rgba(0,245,255,0.5)' : '0 0 8px rgba(0,245,255,0.2)',
          }}
        >
          <span className="text-3xl">🔊</span>
          {speaking ? 'Speaking...' : 'Listen Again'}
        </motion.button>
      </div>

      {/* Shuffled options */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {options.map(opt => {
          let btnStyle: React.CSSProperties = { background: '#1a1a2e', border: '1px solid rgba(0,245,255,0.2)', color: '#e0e0ff' };
          if (revealed && opt === drill.correctAnswer)
            btnStyle = { background: 'rgba(0,255,136,0.12)', border: '2px solid #00ff88', color: '#00ff88', boxShadow: '0 0 12px rgba(0,255,136,0.3)' };
          else if (revealed && opt === selected)
            btnStyle = { background: 'rgba(255,0,128,0.12)', border: '2px solid #ff0080', color: '#ff0080', boxShadow: '0 0 12px rgba(255,0,128,0.3)' };

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => choose(opt)}
              className="rounded-2xl p-4 text-xl font-bold transition-all duration-200"
              style={btnStyle}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold font-orbitron"
            style={{ color: correct ? '#00ff88' : '#ff0080' }}
          >
            {correct ? '✓ Correct!' : `Answer: "${drill.correctAnswer}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
