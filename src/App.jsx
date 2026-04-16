import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Onboarding from './pages/Onboarding';
import Generating from './pages/Generating';
import Home from './pages/Home';
import Diet from './pages/Diet';
import Shopping from './pages/Shopping';
import GuidedShopping from './pages/GuidedShopping';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Progress from './pages/Progress';
import Favorites from './pages/Favorites';
import History from './pages/History';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/generating" element={<Generating />} />
          <Route path="/home" element={<Home />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/guided-shopping" element={<GuidedShopping />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
