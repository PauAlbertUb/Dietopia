import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useApp } from '../context/AppContext';
import { mockFavorites } from '../data/mockData';
import { Heart, Trash2, UtensilsCrossed } from 'lucide-react';

export default function Favorites() {
  const { favorites, toggleFavorite } = useApp();
  const [allFavs, setAllFavs] = useState([...mockFavorites, ...favorites.filter(f => !mockFavorites.find(m => m.id === f.id))]);

  const remove = (id) => {
    setAllFavs(prev => prev.filter(f => f.id !== id));
  };

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
          <p className="text-sm text-gray-400">{allFavs.length} saved meals & recipes</p>
        </div>

        {allFavs.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="text-5xl mb-3">💔</div>
            <p className="text-gray-500 text-sm">No favorites yet</p>
            <p className="text-gray-400 text-xs mt-1">Tap the heart icon on any meal to save it here</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {allFavs.map(fav => (
              <div
                key={fav.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {fav.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${fav.type === 'meal' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                      {fav.type === 'meal' ? '🍽️ Meal' : '📖 Recipe'}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm truncate">{fav.name}</p>
                  <p className="text-xs text-gray-400">{fav.calories} kcal · {fav.dayUsed}</p>
                </div>
                <button
                  onClick={() => remove(fav.id)}
                  className="p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
