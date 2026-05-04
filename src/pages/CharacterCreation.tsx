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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0d0820 100%)' }}>
      {/* Grid overlay */}
      <div className="fixed inset-0 map-grid pointer-events-none" />

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="cyber-card p-8 w-full max-w-lg relative z-10"
        style={{ boxShadow: '0 0 40px rgba(0,245,255,0.1)' }}
      >
        {/* Header glow line */}
        <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)' }} />

        <AnimatePresence mode="wait">
          {step === 'avatar' ? (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="flex flex-col items-center gap-6"
            >
              <h1 className="text-3xl font-black font-orbitron" style={{ color: '#00f5ff' }}>
                Choose Your Hero!
              </h1>
              <p className="text-lg" style={{ color: '#6b6b9a' }}>Pick an avatar to start your quest</p>
              <div className="grid grid-cols-4 gap-3 w-full">
                {AVATARS.map(a => (
                  <motion.button
                    key={a}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => pickAvatar(a)}
                    className="text-5xl rounded-2xl p-3 transition-all"
                    style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.15)' }}
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
              <h1 className="text-3xl font-black font-orbitron" style={{ color: '#00f5ff' }}>
                What's your name?
              </h1>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && finish()}
                placeholder="Enter your name..."
                maxLength={20}
                className="w-full rounded-2xl px-5 py-4 text-2xl font-bold text-center focus:outline-none"
                style={{
                  background: '#1a1a2e',
                  border: '2px solid #00f5ff',
                  color: '#e0e0ff',
                }}
              />
              <div className="flex gap-3 w-full">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep('avatar')}
                  className="flex-1 py-3 rounded-2xl text-lg font-bold"
                  style={{ background: '#1a1a2e', color: '#6b6b9a', border: '1px solid rgba(107,107,154,0.3)' }}
                >
                  ← Back
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={finish}
                  disabled={!name.trim()}
                  className="flex-2 px-8 py-3 rounded-2xl text-lg font-bold cyber-btn disabled:opacity-40"
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
