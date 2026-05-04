import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';

const AVATARS = ['🦊', '🐯', '🦁', '🐸', '🐶', '🐱', '🐼', '🦄', '🦋', '🐉', '🦅', '🐬'];

export default function CharacterCreation() {
  const [step, setStep] = useState<'avatar' | 'name'>('avatar');
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { createProfile } = useGame();

  function pickAvatar(a: string) {
    setAvatar(a);
    setStep('name');
  }

  function finish() {
    if (!name.trim()) return;
    createProfile({ nickname: name.trim(), avatarEmoji: avatar, createdAt: Date.now() });
    navigate('/map');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400 flex flex-col items-center justify-center px-6 py-10">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {step === 'avatar' ? (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="flex flex-col items-center gap-6"
            >
              <h1 className="text-3xl font-black text-indigo-600">Choose Your Hero!</h1>
              <p className="text-gray-500 text-lg">Pick an avatar to start your quest</p>
              <div className="grid grid-cols-4 gap-3 w-full">
                {AVATARS.map(a => (
                  <motion.button
                    key={a}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => pickAvatar(a)}
                    className="text-5xl bg-indigo-50 rounded-2xl p-3 hover:bg-indigo-100 transition-colors"
                  >
                    {a}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: 2, duration: 0.4 }}
                className="text-8xl"
              >
                {avatar}
              </motion.div>
              <h1 className="text-3xl font-black text-indigo-600">What's your name?</h1>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && finish()}
                placeholder="Enter your name..."
                maxLength={20}
                className="w-full border-3 border-indigo-300 rounded-2xl px-5 py-4 text-2xl font-bold text-center focus:outline-none focus:border-indigo-500 bg-indigo-50"
              />
              <div className="flex gap-3 w-full">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep('avatar')}
                  className="flex-1 bg-gray-100 text-gray-500 px-6 py-3 rounded-2xl text-lg font-bold"
                >
                  ← Back
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={finish}
                  disabled={!name.trim()}
                  className="flex-2 bg-indigo-500 text-white px-8 py-3 rounded-2xl text-lg font-bold disabled:opacity-40 shadow-lg"
                >
                  Start Quest! 🚀
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
