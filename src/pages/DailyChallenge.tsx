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
import BottomNav from '../components/layout/BottomNav';
import Confetti from '../components/layout/Confetti';
import { getTodayString } from '../utils/storage';

function DailyDrillRenderer({ drill, onAnswer, idx, total }: { drill: Drill; onAnswer: (c: boolean) => void; idx: number; total: number }) {
  const handleQuiz = (c: boolean, _t: number) => onAnswer(c);
  switch (drill.type) {
    case 'fill-blank': return <FillBlank drill={drill} onAnswer={onAnswer} />;
    case 'scramble':   return <WordScramble drill={drill} onAnswer={onAnswer} />;
    case 'quiz':       return <QuickQuiz drill={drill} onAnswer={handleQuiz} questionNumber={idx + 1} total={total} />;
    case 'clock':      return <ClockDrill drill={drill} onAnswer={onAnswer} />;
    default:           return <FillBlank drill={drill} onAnswer={onAnswer} />;
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

  const finalScore = Math.round((correct / drills.length) * 100);

  if (alreadyDone && !finished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 flex flex-col items-center justify-center px-4 pb-24">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl max-w-sm w-full text-center"
        >
          <span className="text-8xl">🌟</span>
          <h2 className="text-2xl font-black text-yellow-600 mt-4">Already done today!</h2>
          <p className="text-gray-400 mt-2">Come back tomorrow for a new challenge.</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/map')}
            className="mt-6 bg-yellow-500 text-white px-8 py-3 rounded-2xl font-bold text-lg"
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
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 flex flex-col items-center justify-center px-4 pb-24">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="bg-white rounded-3xl p-8 shadow-xl max-w-sm w-full text-center"
        >
          <span className="text-8xl">⭐</span>
          <h1 className="text-3xl font-black text-yellow-600 mt-4">Daily Challenge!</h1>
          <p className="text-gray-500 mt-2 text-lg">10 questions · 2× XP bonus · Today only!</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3 mt-4">
            <p className="text-yellow-700 font-bold">🏆 Up to 100 XP available!</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setStarted(true)}
            className="mt-6 bg-yellow-400 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-lg w-full"
          >
            Let's Go! 🚀
          </motion.button>
        </motion.div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 flex flex-col pb-24">
      {finished && <Confetti count={60} />}

      <div className="bg-white shadow-sm px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-black text-xl text-yellow-600">Daily Challenge</span>
          </div>
          {!finished && <span className="text-gray-500 font-bold">{idx + 1}/{drills.length}</span>}
        </div>
        {!finished && (
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
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
              className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full text-center"
            >
              <span className="text-8xl">{finalScore === 100 ? '🌟' : finalScore >= 70 ? '🏅' : '💪'}</span>
              <h2 className="text-3xl font-black text-yellow-600 mt-3">Challenge Complete!</h2>
              <p className="text-5xl font-black text-gray-700 mt-2">{finalScore}%</p>
              <p className="text-gray-400">{correct}/{drills.length} correct</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-6 py-3 mt-4">
                <p className="text-lg font-bold text-yellow-600">+{xpEarned} XP earned! ⚡</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/map')}
                className="mt-6 bg-yellow-400 text-white px-8 py-3 rounded-2xl font-black text-xl w-full"
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
