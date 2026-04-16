import { useNavigate, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, ShoppingCart, User, Bell, TrendingUp, Heart, History } from 'lucide-react';

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/diet', icon: UtensilsCrossed, label: 'Diet' },
  { path: '/shopping', icon: ShoppingCart, label: 'Shopping' },
  { path: '/progress', icon: TrendingUp, label: 'Progress' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="font-bold text-gray-900">Dietopia</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/favorites')}
              className={`p-2 rounded-xl transition-colors ${location.pathname === '/favorites' ? 'bg-rose-50 text-rose-500' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/notifications')}
              className={`relative p-2 rounded-xl transition-colors ${location.pathname === '/notifications' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-2xl mx-auto w-full pb-24">
        {children}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-around">
          {navItems.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  active
                    ? 'text-emerald-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} />
                </div>
                <span className={`text-xs font-medium ${active ? 'text-emerald-600' : ''}`}>{label}</span>
                {active && <div className="w-1 h-1 rounded-full bg-emerald-500" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
