import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Drill } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean, timeMs: number) => void;
  questionNumber: number;
  total: number;
}

const TIME_LIMIT = 20;

export default function QuickQuiz({ drill, onAnswer, questionNumber, total }: Props) {
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [startTime] = useState(Date.now());

  const options = useMemo(
    () => shuffleOptions(drill.options ?? []),
    [drill.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (revealed) return;
    if (timeLeft <= 0) { handleTimeout(); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, revealed]);

  function handleTimeout() {
    setRevealed(true);
    setTimeout(() => onAnswer(false, TIME_LIMIT * 1000), 700);
  }

  function choose(opt: string) {
    if (revealed) return;
    const elapsed = Date.now() - startTime;
    setSelected(opt);
    setRevealed(true);
    setTimeout(() => onAnswer(opt === drill.correctAnswer, elapsed), 600);
  }

  const percent = (timeLeft / TIME_LIMIT) * 100;
  const urgentTimer = timeLeft <= 5;

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg">
        <span className="text-lg font-bold font-mono" style={{ color: '#6b6b9a' }}>{questionNumber}/{total}</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{urgentTimer ? '⏰' : '⏱️'}</span>
          <span className="text-2xl font-bold font-orbitron"
            style={{ color: urgentTimer ? '#ff0080' : '#00f5ff' }}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full max-w-lg h-3 rounded-full overflow-hidden"
        style={{ background: 'rgba(0,245,255,0.08)' }}>
        <motion.div
          className={`h-full rounded-full ${urgentTimer ? 'pulse-pink' : ''}`}
          style={{
            background: urgentTimer
              ? '#ff0080'
              : 'linear-gradient(90deg, #00f5ff, #b400ff)',
          }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question */}
      <div className="rounded-3xl p-6 w-full max-w-lg text-center"
        style={{ background: '#12121a', border: '1px solid rgba(0,245,255,0.18)' }}>
        <p className="text-xl font-bold leading-relaxed" style={{ color: '#e0e0ff' }}>{drill.question}</p>
      </div>

      {/* Shuffled options — labeled A B C D by position */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
        {options.map((opt, i) => {
          const labels = ['A', 'B', 'C', 'D'];
          let btnStyle: React.CSSProperties = {
            background: '#1a1a2e',
            border: '1px solid rgba(255,107,0,0.25)',
            color: '#e0e0ff',
          };
          if (revealed && opt === drill.correctAnswer)
            btnStyle = { background: 'rgba(0,255,136,0.12)', border: '2px solid #00ff88', color: '#00ff88', boxShadow: '0 0 12px rgba(0,255,136,0.3)' };
          else if (revealed && opt === selected)
            btnStyle = { background: 'rgba(255,0,128,0.12)', border: '2px solid #ff0080', color: '#ff0080', boxShadow: '0 0 12px rgba(255,0,128,0.3)' };

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => choose(opt)}
              className="rounded-2xl p-3 text-base font-bold transition-all flex items-start gap-2"
              style={btnStyle}
            >
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold font-orbitron shrink-0 mt-0.5"
                style={{ background: 'rgba(255,107,0,0.15)', color: '#ff6b00' }}>
                {labels[i]}
              </span>
              <span className="text-left leading-snug">{opt}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
