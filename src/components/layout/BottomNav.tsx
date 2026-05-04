import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TABS = [
  { path: '/map',      icon: '🗺️', label: 'Map' },
  { path: '/practice', icon: '📚', label: 'Practice' },
  { path: '/daily',    icon: '⭐', label: 'Daily' },
  { path: '/profile',  icon: '🏅', label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-20 px-2 z-50"
      style={{ background: '#0d0d18', borderTop: '1px solid rgba(0,245,255,0.15)' }}>
      {TABS.map(tab => {
        const active = location.pathname === tab.path;
        return (
          <motion.button
            key={tab.path}
            whileTap={{ scale: 0.88 }}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all relative"
            style={active ? {
              background: 'rgba(0,245,255,0.08)',
              border: '1px solid rgba(0,245,255,0.25)',
            } : {}}
          >
            <span className="text-3xl">{tab.icon}</span>
            <span className="text-xs font-bold" style={{ color: active ? '#00f5ff' : '#6b6b9a' }}>
              {tab.label}
            </span>
            {active && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-1 w-6 h-0.5 rounded-full"
                style={{ background: '#00f5ff', boxShadow: '0 0 8px #00f5ff' }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
