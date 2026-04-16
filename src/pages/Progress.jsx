import AppLayout from '../components/AppLayout';
import { useApp } from '../context/AppContext';
import { mockProgress } from '../data/mockData';
import { TrendingDown, DollarSign, Award, Flame, Calendar } from 'lucide-react';

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 bg-${color}-100`}>
        <Icon className={`w-4.5 h-4.5 text-${color}-600`} />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-emerald-600 mt-1 font-medium">{sub}</p>}
    </div>
  );
}

function WeekBar({ week, compliance, avgCalories, weight, saved, isLatest }) {
  return (
    <div className={`bg-white rounded-2xl p-4 border transition-all ${isLatest ? 'border-emerald-300 shadow-md' : 'border-gray-100 shadow-sm'}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-sm text-gray-900">Week {week}</p>
          {isLatest && <span className="text-xs text-emerald-600 font-medium">Current week</span>}
        </div>
        <div className="text-right">
          <p className="font-bold text-emerald-600">€{saved.toFixed(2)} saved</p>
          <p className="text-xs text-gray-400">{weight}kg</p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Compliance</span>
            <span className="font-medium text-emerald-600">{compliance}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full h-2 transition-all duration-700"
              style={{ width: `${compliance}%` }}
            />
          </div>
        </div>
        <div className="flex gap-3 text-xs text-gray-500">
          <span>~{avgCalories} kcal/day avg</span>
        </div>
      </div>
    </div>
  );
}

export default function Progress() {
  const { profile } = useApp();
  const prog = mockProgress;

  const bmi = (profile.weight / ((profile.height / 100) ** 2)).toFixed(1);
  const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';

  return (
    <AppLayout>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
          <p className="text-sm text-gray-400">Week {prog.currentWeek} of your journey</p>
        </div>

        {/* Overview */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold">Overall Progress</p>
            <span className="bg-white/20 text-sm font-medium px-3 py-1 rounded-full">
              {prog.daysCompleted}/{prog.totalDays} days
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 mb-1">
            <div
              className="bg-white rounded-full h-3 transition-all duration-700"
              style={{ width: `${(prog.daysCompleted / prog.totalDays) * 100}%` }}
            />
          </div>
          <p className="text-xs opacity-70">{Math.round((prog.daysCompleted / prog.totalDays) * 100)}% of your 30-day plan complete</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 bg-blue-100">
              <TrendingDown className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">-{prog.weightLost}kg</p>
            <p className="text-xs text-gray-400 mt-0.5">Weight lost</p>
            <p className="text-xs text-blue-600 mt-1 font-medium">Great progress!</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 bg-green-100">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">€{prog.moneySaved.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">Saved this week</p>
            <p className="text-xs text-green-600 mt-1 font-medium">vs. before Dietopia</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 bg-yellow-100">
              <Award className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">Week {prog.currentWeek}</p>
            <p className="text-xs text-gray-400 mt-0.5">Current streak</p>
            <p className="text-xs text-yellow-600 mt-1 font-medium">Keep going! 🔥</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 bg-orange-100">
              <Flame className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">BMI {bmi}</p>
            <p className="text-xs text-gray-400 mt-0.5">{bmiCategory}</p>
            <p className="text-xs text-orange-600 mt-1 font-medium">{profile.weight}kg · {profile.height}cm</p>
          </div>
        </div>

        {/* Weekly breakdown */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Weekly breakdown</h2>
          <div className="space-y-3">
            {prog.weeklySummaries.map(w => (
              <WeekBar
                key={w.week}
                {...w}
                isLatest={w.week === prog.currentWeek}
              />
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <h3 className="font-semibold text-sm text-gray-900">Month overview</h3>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium
                  ${i < prog.daysCompleted ? 'bg-emerald-500 text-white' :
                    i === prog.daysCompleted ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-400' :
                    'bg-gray-100 text-gray-400'}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-500 rounded-sm" /><span className="text-xs text-gray-500">Completed</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-gray-100 rounded-sm border" /><span className="text-xs text-gray-500">Upcoming</span></div>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </AppLayout>
  );
}
