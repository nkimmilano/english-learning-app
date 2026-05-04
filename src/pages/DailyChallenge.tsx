import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { DAILY_CHALLENGE_DRILLS } from '../data/lessons';
import { Drill } from '../types';
import FillBlank from '../components/drills/FillBlank';
import WordScramble from '../components/drills/WordScramble';
import QuickQuiz from '../components/drills/QuickQuiz';
import ClockDrill from '../components/drills/ClockDrill';
import HomophoneDrill from '../components/drills/HomophoneDrill';
import BottomNav from '../components/layout/BottomNav';
import Confetti from '../components/layout/Confetti';
import { getTodayString } from '../utils/storage';

function DailyDrillRenderer({ drill, onAnswer, idx, total }: { drill: Drill; onAnswer: (c: boolean) => void; idx: number; total: number }) {
  const handleQuiz = (c: boolean, _t: number) => onAnswer(c);
  switch (drill.type) {
    case 'fill-blank':  return <FillBlank drill={drill} onAnswer={onAnswer} />;
    case 'scramble':    return <WordScramble drill={drill} onAnswer={onAnswer} />;
    case 'quiz':        return <QuickQuiz drill={drill} onAnswer={handleQuiz} questionNumber={idx + 1} total={total} />;
    case 'clock':       return <ClockDrill drill={drill} onAnswer={onAnswer} />;
    case 'homophone':   return <HomophoneDrill drill={drill} onAnswer={onAnswer} />;
    default:            return <FillBlank drill={drill} onAnswer={onAnswer} />;
  }
}

export default function DailyChallenge() {
  const navigate = useNavigate();
  const { dailyChallengeDate, dailyChallengeCompleted, completeDailyChallenge } = useGame();

  const today = getTodayString();
  const alreadyDone = dailyChallengeDate === today && dailyChallengeCompleted;

  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [key, setKey] = useState(0);

  const drills = DAILY_CHALLENGE_DRILLS;
  const currentDrill = drills[idx] as Drill;

  function handleAnswer(isCorrect: boolean) {
    if (isCorrect) setCorrect(c => c + 1);
    setTimeout(() => {
      if (idx + 1 >= drills.length) {
        const score = Math.round(((isCorrect ? correct + 1 : correct) / drills.length) * 100);
        const result = completeDailyChallenge(score);
        setXpEarned(result.xpEarned);
        setFinished(true);
      } else {
        setIdx(i => i + 1);
        setKey(k => k + 1);
      }
    }, 800);
  }

  const finalScore = Math.round(((finished ? correct : 0) / drills.length) * 100);

  if (alreadyDone && !finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24"
        style={{ background: '#0a0a0f' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="rounded-3xl p-8 max-w-sm w-full text-center"
          style={{ background: '#12121a', border: '1px solid rgba(255,107,0,0.3)' }}
        >
          <span className="text-8xl">🌟</span>
          <h2 className="text-2xl font-black font-orbitron mt-4" style={{ color: '#ff6b00' }}>
            Already done today!
          </h2>
          <p className="mt-2" style={{ color: '#6b6b9a' }}>Come back tomorrow for a new challenge.</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/map')}
            className="mt-6 px-8 py-3 rounded-2xl font-bold text-lg cyber-btn w-full"
          >
            Back to Map 🗺️
          </motion.button>
        </motion.div>
        <BottomNav />
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24"
        style={{ background: '#0a0a0f' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="rounded-3xl p-8 max-w-sm w-full text-center"
          style={{
            background: '#12121a',
            border: '2px solid #ff6b00',
            boxShadow: '0 0 32px rgba(255,107,0,0.2)',
          }}
        >
          <span className="text-8xl">⭐</span>
          <h1 className="text-3xl font-black font-orbitron mt-4" style={{ color: '#ff6b00' }}>
            Daily Challenge!
          </h1>
          <p className="mt-2 text-lg" style={{ color: '#6b6b9a' }}>
            10 questions · 2× XP bonus · Today only!
          </p>
          <div className="rounded-2xl px-4 py-3 mt-4"
            style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.25)' }}>
            <p className="font-bold" style={{ color: '#ff6b00' }}>🏆 Up to 100 XP available!</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setStarted(true)}
            className="mt-6 px-10 py-4 rounded-2xl font-black text-xl w-full"
            style={{
              background: 'rgba(255,107,0,0.15)',
              border: '2px solid #ff6b00',
              color: '#ff6b00',
              boxShadow: '0 0 20px rgba(255,107,0,0.3)',
            }}
          >
            Let's Go! 🚀
          </motion.button>
        </motion.div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-24" style={{ background: '#0a0a0f' }}>
      {finished && <Confetti count={60} />}

      <div className="px-4 pt-6 pb-4"
        style={{ background: 'rgba(10,10,15,0.9)', borderBottom: '1px solid rgba(255,107,0,0.2)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-black text-xl font-orbitron" style={{ color: '#ff6b00' }}>
              Daily Challenge
            </span>
          </div>
          {!finished && (
            <span className="font-mono text-sm" style={{ color: '#6b6b9a' }}>
              {idx + 1}/{drills.length}
            </span>
          )}
        </div>
        {!finished && (
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,107,0,0.1)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #ff6b00, #ff0080)' }}
              animate={{ width: `${((idx + 1) / drills.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              className="w-full max-w-xl"
            >
              <DailyDrillRenderer drill={currentDrill} onAnswer={handleAnswer} idx={idx} total={drills.length} />
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="rounded-3xl p-8 max-w-md w-full text-center"
              style={{
                background: '#12121a',
                border: '2px solid #00ff88',
                boxShadow: '0 0 40px rgba(0,255,136,0.2)',
              }}
            >
              <span className="text-8xl">{finalScore === 100 ? '🌟' : finalScore >= 70 ? '🏅' : '💪'}</span>
              <h2 className="text-3xl font-black font-orbitron mt-3" style={{ color: '#00ff88' }}>
                Challenge Complete!
              </h2>
              <p className="text-5xl font-black font-orbitron mt-2" style={{ color: '#00f5ff' }}>{finalScore}%</p>
              <p style={{ color: '#6b6b9a' }}>{correct}/{drills.length} correct</p>
              <div className="rounded-2xl px-6 py-3 mt-4"
                style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.25)' }}>
                <p className="text-lg font-bold font-mono" style={{ color: '#00ff88' }}>
                  +{xpEarned} XP earned! ⚡
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/map')}
                className="mt-6 px-8 py-3 rounded-2xl font-black text-xl w-full cyber-btn"
              >
                Back to Map 🗺️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
