import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';
import { fetchElevenLabsAudio, hasElevenLabs, speakFallback } from '../../utils/elevenlabs';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

export default function Listening({ drill, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioBlobUrl = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const options = useMemo(
    () => shuffleOptions(drill.options ?? []),
    [drill.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    // Auto-play on mount
    void playWord();
    return () => {
      audioRef.current?.pause();
      if (audioBlobUrl.current) URL.revokeObjectURL(audioBlobUrl.current);
      window.speechSynthesis?.cancel();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function playWord() {
    if (isPlaying || isLoading) return;

    if (audioBlobUrl.current) {
      replayBlob(audioBlobUrl.current);
      return;
    }

    if (hasElevenLabs) {
      setIsLoading(true);
      const url = await fetchElevenLabsAudio(drill.correctAnswer);
      setIsLoading(false);
      if (url) {
        audioBlobUrl.current = url;
        replayBlob(url);
        return;
      }
    }

    // Fallback
    speakFallback(drill.correctAnswer);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1200);
  }

  function replayBlob(url: string) {
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
    audio.play().catch(() => setIsPlaying(false));
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
      {drill.imageEmoji && <span className="text-7xl">{drill.imageEmoji}</span>}
      <p className="text-lg font-medium text-center" style={{ color: '#6b6b9a' }}>{drill.question}</p>

      <motion.button whileTap={{ scale: 0.92 }} onClick={playWord} disabled={isLoading}
        className="w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1 transition-all"
        style={isLoading ? {
          background: 'rgba(0,245,255,0.05)', border: '3px solid rgba(0,245,255,0.2)', color: '#6b6b9a',
        } : isPlaying ? {
          background: 'rgba(0,245,255,0.2)', border: '3px solid #00f5ff', color: '#00f5ff',
          boxShadow: '0 0 28px rgba(0,245,255,0.45)',
        } : {
          background: 'rgba(0,245,255,0.08)', border: '3px solid rgba(0,245,255,0.5)', color: '#00f5ff',
        }}>
        <span className="text-4xl">{isLoading ? '⟳' : '🔊'}</span>
        <span className="text-xs font-orbitron">{isLoading ? 'LOADING' : isPlaying ? 'PLAYING' : 'LISTEN'}</span>
      </motion.button>

      <AnimatePresence>
        {isPlaying && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-1 items-end h-5">
            {[1,2,3,4,5].map(i => (
              <motion.div key={i} className="w-1.5 rounded-full" style={{ background: '#00f5ff' }}
                animate={{ height: [3, 18, 3] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {options.map(opt => {
          let s: React.CSSProperties = { background: '#1a1a2e', border: '1px solid rgba(0,245,255,0.2)', color: '#e0e0ff' };
          if (revealed && opt === drill.correctAnswer)
            s = { background: 'rgba(0,255,136,0.12)', border: '2px solid #00ff88', color: '#00ff88', boxShadow: '0 0 14px rgba(0,255,136,0.3)' };
          else if (revealed && opt === selected)
            s = { background: 'rgba(255,0,128,0.12)', border: '2px solid #ff0080', color: '#ff0080', boxShadow: '0 0 14px rgba(255,0,128,0.3)' };
          return (
            <motion.button key={opt} whileTap={{ scale: 0.95 }} onClick={() => choose(opt)}
              className="py-4 rounded-2xl font-bold text-lg text-center transition-all" style={s}>
              {opt}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="text-lg font-bold font-orbitron"
            style={{ color: correct ? '#00ff88' : '#ff0080' }}>
            {correct ? '✓ Correct!' : `✗ The answer was "${drill.correctAnswer}"`}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
