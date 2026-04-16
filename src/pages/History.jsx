import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { mockDiet } from '../data/mockData';
import { Clock, ChevronRight, Search } from 'lucide-react';

export default function History() {
  const [search, setSearch] = useState('');

  // Build history from mock diet data
  const historyItems = mockDiet.week.flatMap((day, di) =>
    day.meals.map(meal => ({
      ...meal,
      day: day.day,
      dayIndex: di,
      date: `Week 3, ${day.day}`,
    }))
  );

  const filtered = search
    ? historyItems.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.day.toLowerCase().includes(search.toLowerCase()))
    : historyItems;

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-gray-900">History</h1>
          <p className="text-sm text-gray-400">Your past meals & diets</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search meals..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all bg-white"
          />
        </div>

        {/* Grouped by day */}
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
          const dayItems = filtered.filter(h => h.day === day);
          if (!dayItems.length) return null;
          return (
            <div key={day}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Week 3 · {day}</p>
              <div className="space-y-2">
                {dayItems.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-emerald-600 font-medium">{item.type}</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{item.time} · {item.calories} kcal
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-gray-600">€{item.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500 text-sm">No results found</p>
          </div>
        )}

        <div className="h-4" />
      </div>
    </AppLayout>
  );
}
