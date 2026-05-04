import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TABS = [
  { path: '/map', icon: '🗺️', label: 'Map' },
  { path: '/practice', icon: '📚', label: 'Practice' },
  { path: '/daily', icon: '⭐', label: 'Daily' },
  { path: '/profile', icon: '🏅', label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 flex justify-around items-center h-20 px-2 z-50 shadow-lg">
      {TABS.map(tab => {
        const active = location.pathname === tab.path;
        return (
          <motion.button
            key={tab.path}
            whileTap={{ scale: 0.88 }}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
              active ? 'bg-indigo-100' : ''
            }`}
          >
            <span className="text-3xl">{tab.icon}</span>
            <span className={`text-xs font-bold ${active ? 'text-indigo-600' : 'text-gray-400'}`}>
              {tab.label}
            </span>
            {active && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-1 w-1 h-1 bg-indigo-500 rounded-full"
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
