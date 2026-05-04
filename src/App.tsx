import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GameProvider, useGame } from './contexts/GameContext';
import CharacterCreation from './pages/CharacterCreation';
import MapPage from './pages/MapPage';
import PracticePage from './pages/PracticePage';
import DailyChallenge from './pages/DailyChallenge';
import ProfilePage from './pages/ProfilePage';
import LessonPlay from './pages/LessonPlay';
import TeacherMode from './pages/TeacherMode';

function AppRoutes() {
  const { profile } = useGame();
  const location = useLocation();

  if (!profile) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="*" element={<CharacterCreation />} />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/map" replace />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/daily" element={<DailyChallenge />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/lesson/:id" element={<LessonPlay />} />
        <Route path="/teacher" element={<TeacherMode />} />
        <Route path="*" element={<Navigate to="/map" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GameProvider>
  );
}
