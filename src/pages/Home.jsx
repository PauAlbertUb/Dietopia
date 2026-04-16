import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AppLayout from '../components/AppLayout';
import { ShoppingCart, UtensilsCrossed, Flame, Target, TrendingUp, ChevronRight, Calendar } from 'lucide-react';

const motivationalMessages = [
  "You're doing amazing! Keep it up! 🌟",
  "Consistency is key — great work today! 💪",
  "Every healthy meal is a step forward! 🥗",
  "You're building great habits! ✨",
  "Stay on track — you've got this! 🚀",
];

export default function Home() {
  const navigate = useNavigate();
  const { profile, diet, currentDay, shoppingList } = useApp();
  const msgIndex = currentDay % motivationalMessages.length;
  const todayMeals = diet?.week?.[currentDay - 1]?.meals || [];
  const todayCalories = todayMeals.reduce((s, m) => s + m.calories, 0);

  return (
    <AppLayout>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="pt-2">
          <p className="text-gray-400 text-sm">Good morning,</p>
          <h1 className="text-2xl font-bold text-gray-900">{profile.name} 👋</h1>
        </div>

        {/* Motivational banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white">
          <p className="text-sm opacity-90 mb-1">Daily motivation</p>
          <p className="font-semibold text-lg leading-snug">{motivationalMessages[msgIndex]}</p>
          <div className="flex items-center gap-4 mt-4">
            <div>
              <p className="text-2xl font-bold">{currentDay}<span className="text-base font-normal opacity-80">/7</span></p>
              <p className="text-xs opacity-80">Days completed</p>
            </div>
            <div className="flex-1">
              <div className="bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2 transition-all duration-500" style={{ width: `${(currentDay / 7) * 100}%` }} />
              </div>
              <p className="text-xs mt-1 opacity-80">Week progress</p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Flame, label: "Today's calories", value: `${todayCalories} kcal`, color: 'orange' },
            { icon: Target, label: 'Week goal', value: `${currentDay}/7 days`, color: 'emerald' },
            { icon: TrendingUp, label: 'Money saved', value: '€12.40', color: 'blue' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 bg-${color}-100`}>
                <Icon className={`w-4 h-4 text-${color}-600`} />
              </div>
              <p className="text-lg font-bold text-gray-900 leading-none">{value.split(' ')[0]}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Today's meals */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Today's meals</h2>
            <button
              onClick={() => navigate('/diet')}
              className="text-sm text-emerald-600 font-medium flex items-center gap-0.5 hover:underline"
            >
              See all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2.5">
            {todayMeals.length ? todayMeals.map(meal => (
              <div
                key={meal.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/diet')}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {meal.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-emerald-600 font-medium">{meal.type}</p>
                  <p className="font-semibold text-gray-900 text-sm truncate">{meal.name}</p>
                  <p className="text-xs text-gray-400">{meal.calories} kcal · {meal.time}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg font-medium">€{meal.price.toFixed(2)}</span>
                </div>
              </div>
            )) : (
              <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm">No meals planned yet</p>
                <button onClick={() => navigate('/onboarding')} className="mt-2 text-emerald-600 text-sm font-medium hover:underline">
                  Generate your diet →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/diet')}
            className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-start gap-3 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Current Diet</p>
              <p className="text-xs text-gray-400">View weekly plan</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/shopping')}
            className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-start gap-3 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
          >
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Shopping</p>
              <p className="text-xs text-gray-400">
                {shoppingList ? `€${shoppingList.optimizedPrice.toFixed(2)} total` : 'View list'}
              </p>
            </div>
          </button>
        </div>

        {/* Week calendar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <h3 className="font-semibold text-gray-900 text-sm">This week</h3>
          </div>
          <div className="flex gap-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div
                key={i}
                className={`flex-1 flex flex-col items-center py-2 rounded-xl text-xs transition-all cursor-pointer
                  ${i + 1 === currentDay ? 'bg-emerald-500 text-white font-bold' :
                    i + 1 < currentDay ? 'bg-emerald-100 text-emerald-600' :
                    'bg-gray-50 text-gray-400'}`}
              >
                <span>{d}</span>
                {i + 1 < currentDay && <span className="mt-0.5">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
