import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AppLayout from '../components/AppLayout';
import { ChevronDown, ChevronUp, Heart, RefreshCw, Info, Clock, Flame, ChevronRight } from 'lucide-react';
import { alternativeMeals } from '../data/mockData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function MealCard({ meal, onChangeDish, onFavorite, isFav }) {
  const [expanded, setExpanded] = useState(false);
  const [changing, setChanging] = useState(false);

  const handleChange = async () => {
    setChanging(true);
    await new Promise(r => setTimeout(r, 600));
    onChangeDish(meal);
    setChanging(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
            {meal.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{meal.type}</span>
              <span className="text-xs text-gray-400 flex items-center gap-0.5"><Clock className="w-3 h-3" />{meal.time}</span>
            </div>
            <p className="font-semibold text-gray-900 text-sm leading-snug">{meal.name}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-xs text-orange-500 flex items-center gap-0.5"><Flame className="w-3 h-3" />{meal.calories}</span>
              <span className="text-xs text-blue-500">P: {meal.protein}g</span>
              <span className="text-xs text-yellow-500">C: {meal.carbs}g</span>
              <span className="text-xs text-purple-500">F: {meal.fat}g</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">€{meal.price.toFixed(2)}</span>
            <div className="flex gap-1">
              <button
                onClick={() => onFavorite(meal)}
                className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Heart className={`w-3.5 h-3.5 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
              </button>
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {expanded ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1.5">Ingredients:</p>
            <div className="flex flex-wrap gap-1.5">
              {meal.ingredients.map((ing, i) => (
                <span key={i} className="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded-lg">{ing}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">Recipe:</p>
            <p className="text-xs text-gray-500 leading-relaxed">{meal.recipe}</p>
          </div>
          <button
            onClick={handleChange}
            disabled={changing}
            className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all"
          >
            {changing ? (
              <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            {changing ? 'Finding alternative...' : 'Change dish'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Diet() {
  const navigate = useNavigate();
  const { diet, toggleFavorite, isFavorite } = useApp();
  const [selectedDay, setSelectedDay] = useState(0);
  const [meals, setMeals] = useState(null);
  const [changedMeals, setChangedMeals] = useState({});

  const currentMeals = meals?.[selectedDay] ?? diet?.week?.[selectedDay]?.meals ?? [];

  const handleChangeDish = (meal) => {
    const alt = alternativeMeals.find(a => a.type === meal.type) || alternativeMeals[0];
    setChangedMeals(prev => ({ ...prev, [meal.id]: true }));
    // Replace meal in the current day
    const updatedMeals = currentMeals.map(m => m.id === meal.id ? { ...alt, id: meal.id } : m);
    setMeals(prev => {
      const next = prev ? [...prev] : diet.week.map(d => [...d.meals]);
      next[selectedDay] = updatedMeals;
      return next;
    });
  };

  if (!diet) {
    return (
      <AppLayout>
        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-5xl mb-4">🥗</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No diet generated yet</h2>
          <p className="text-gray-500 text-sm mb-6">Complete your profile to generate a personalized diet plan.</p>
          <button
            onClick={() => navigate('/onboarding')}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            Generate my diet
          </button>
        </div>
      </AppLayout>
    );
  }

  const dayMeals = meals ? (meals[selectedDay] || currentMeals) : currentMeals;
  const dayCalories = dayMeals.reduce((s, m) => s + m.calories, 0);
  const dayPrice = dayMeals.reduce((s, m) => s + m.price, 0);

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Diet</h1>
            <p className="text-sm text-gray-400">Weekly personalized plan</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-600">€{dayPrice.toFixed(2)}</p>
            <p className="text-xs text-gray-400">today's cost</p>
          </div>
        </div>

        {/* Day selector */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {DAYS.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDay(i)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200
                ${selectedDay === i
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md scale-105'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-emerald-300'}`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Day summary */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
          <p className="text-sm font-semibold text-gray-700 mb-2">{DAYS[selectedDay]} Summary</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: 'Calories', value: `${dayCalories}`, unit: 'kcal', color: 'orange' },
              { label: 'Protein', value: `${dayMeals.reduce((s, m) => s + m.protein, 0)}`, unit: 'g', color: 'blue' },
              { label: 'Carbs', value: `${dayMeals.reduce((s, m) => s + m.carbs, 0)}`, unit: 'g', color: 'yellow' },
              { label: 'Fat', value: `${dayMeals.reduce((s, m) => s + m.fat, 0)}`, unit: 'g', color: 'purple' },
            ].map(({ label, value, unit, color }) => (
              <div key={label}>
                <p className={`text-base font-bold text-${color}-600`}>{value}<span className="text-xs font-normal">{unit}</span></p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meals */}
        <div className="space-y-3">
          {dayMeals.map(meal => (
            <MealCard
              key={meal.id}
              meal={meal}
              onChangeDish={handleChangeDish}
              onFavorite={toggleFavorite}
              isFav={isFavorite(meal.id)}
            />
          ))}
        </div>

        {/* Shopping CTA */}
        <button
          onClick={() => navigate('/shopping')}
          className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
        >
          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
            🛒
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-900 text-sm">View Shopping List</p>
            <p className="text-xs text-gray-400">All ingredients organized by supermarket</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </AppLayout>
  );
}
