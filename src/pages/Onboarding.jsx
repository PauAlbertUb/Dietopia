import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, Check, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dietGoals, dietTypes, restrictions } from '../data/mockData';

const TOTAL_STEPS = 8;

function ProgressBar({ current, total }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-emerald-600">Step {current} of {total}</span>
        <span className="text-sm text-gray-400">{Math.round((current / total) * 100)}% complete</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function ProfileVisual({ data }) {
  const filled = Object.values(data).filter(v => v !== '' && v !== null && v !== undefined).length;
  const total = Object.keys(data).length;
  const pct = Math.round((filled / total) * 100);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15.9" fill="none"
              stroke="url(#grad)" strokeWidth="3"
              strokeDasharray={`${pct} ${100 - pct}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-emerald-600">
            {pct}%
          </span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-700">Your profile</p>
          <p className="text-xs text-gray-500 mt-0.5">{filled}/{total} fields filled</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {data.goal && <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">{data.goal}</span>}
            {data.dietType && <span className="bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full">{data.dietType}</span>}
            {data.weight && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{data.weight}kg</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const { updateProfile, generateDiet } = useApp();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    weight: '',
    height: '',
    goal: '',
    restrictions: [],
    budget: '',
    dietType: '',
    cookingTime: '',
    shoppingTime: '',
    trainingDays: '',
    foodPrefs: [],
    people: '',
  });
  const [skipToAdvanced, setSkipToAdvanced] = useState(false);

  const update = (key, val) => setData(d => ({ ...d, [key]: val }));
  const toggleArr = (key, val) => setData(d => ({
    ...d,
    [key]: d[key].includes(val) ? d[key].filter(v => v !== val) : [...d[key], val],
  }));

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(s => s + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
    else navigate('/');
  };

  const handleGenerateNow = async () => {
    updateProfile(data);
    generateDiet();
    navigate('/generating');
  };

  const handleFinish = () => {
    updateProfile(data);
    generateDiet();
    navigate('/generating');
  };

  const steps = [
    // Step 1: Weight & Height
    <div key={1} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Your measurements</h2>
        <p className="text-gray-500 text-sm">Help us personalize your diet plan</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Weight (kg)</label>
          <input
            type="number"
            value={data.weight}
            onChange={e => update('weight', e.target.value)}
            placeholder="70"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Height (cm)</label>
          <input
            type="number"
            value={data.height}
            onChange={e => update('height', e.target.value)}
            placeholder="170"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all"
          />
        </div>
      </div>
    </div>,

    // Step 2: Goal
    <div key={2} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">What's your main goal?</h2>
        <p className="text-gray-500 text-sm">Choose what matters most to you</p>
      </div>
      <div className="space-y-2.5">
        {dietGoals.map(g => (
          <button
            key={g.value}
            onClick={() => update('goal', g.label)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-left
              ${data.goal === g.label
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40'}`}
          >
            <span className="text-xl">{g.emoji}</span>
            <span className="font-medium text-sm">{g.label}</span>
            {data.goal === g.label && <Check className="w-4 h-4 ml-auto text-emerald-500" />}
          </button>
        ))}
      </div>
    </div>,

    // Step 3: Dietary Restrictions
    <div key={3} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Any dietary restrictions?</h2>
        <p className="text-gray-500 text-sm">Select all that apply (or skip if none)</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {restrictions.map(r => (
          <button
            key={r.value}
            onClick={() => toggleArr('restrictions', r.label)}
            className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 transition-all duration-200 text-sm
              ${data.restrictions.includes(r.label)
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium'
                : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40'}`}
          >
            <span>{r.emoji}</span>
            {r.label}
            {data.restrictions.includes(r.label) && <Check className="w-3 h-3 ml-auto text-emerald-500" />}
          </button>
        ))}
      </div>
    </div>,

    // Step 4: Budget
    <div key={4} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Weekly food budget</h2>
        <p className="text-gray-500 text-sm">We'll optimize your shopping within this limit</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget per week (€)</label>
        <input
          type="number"
          value={data.budget}
          onChange={e => update('budget', e.target.value)}
          placeholder="60"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all"
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[30, 60, 100].map(b => (
          <button
            key={b}
            onClick={() => update('budget', b)}
            className={`py-2.5 rounded-xl text-sm font-medium border-2 transition-all
              ${data.budget == b ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:border-emerald-300 text-gray-600'}`}
          >
            €{b}/wk
          </button>
        ))}
      </div>
      <div className="bg-emerald-50 rounded-xl p-4 text-sm text-emerald-700">
        💡 Average users save <strong>€15-40/month</strong> with our optimized shopping
      </div>
    </div>,

    // Step 5: Diet Type
    <div key={5} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Preferred diet style</h2>
        <p className="text-gray-500 text-sm">What type of diet suits you best?</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {dietTypes.map(d => (
          <button
            key={d.value}
            onClick={() => update('dietType', d.label)}
            className={`flex items-center gap-2 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-sm
              ${data.dietType === d.label
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium'
                : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40'}`}
          >
            <span className="text-xl">{d.emoji}</span>
            <span>{d.label}</span>
            {data.dietType === d.label && <Check className="w-3 h-3 ml-auto text-emerald-500" />}
          </button>
        ))}
      </div>
    </div>,

    // Step 6: Cooking time
    <div key={6} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Time for cooking</h2>
        <p className="text-gray-500 text-sm">How much time can you spend cooking each day?</p>
      </div>
      <div className="space-y-2.5">
        {['Under 15 min', '15-30 min', '30-60 min', 'No limit'].map(t => (
          <button
            key={t}
            onClick={() => update('cookingTime', t)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-sm
              ${data.cookingTime === t
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium'
                : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40'}`}
          >
            ⏱️ {t}
            {data.cookingTime === t && <Check className="w-4 h-4 ml-auto text-emerald-500" />}
          </button>
        ))}
      </div>
    </div>,

    // Step 7: Training
    <div key={7} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Training habits</h2>
        <p className="text-gray-500 text-sm">This helps calibrate your caloric needs</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Training days per week</label>
        <div className="flex gap-2">
          {[0,1,2,3,4,5,6,7].map(d => (
            <button
              key={d}
              onClick={() => update('trainingDays', d)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all
                ${data.trainingDays === d ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:border-emerald-300 text-gray-600'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Food preferences (optional)</label>
        <div className="flex flex-wrap gap-2">
          {['Spicy', 'Sweet', 'Savory', 'Mild', 'International', 'Local'].map(p => (
            <button
              key={p}
              onClick={() => toggleArr('foodPrefs', p)}
              className={`px-3 py-1.5 rounded-full text-sm border-2 transition-all
                ${data.foodPrefs.includes(p) ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:border-emerald-300'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>,

    // Step 8: People
    <div key={8} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">How many people?</h2>
        <p className="text-gray-500 text-sm">We'll adjust portions and shopping quantities</p>
      </div>
      <div className="flex items-center gap-4 justify-center py-4">
        <button
          onClick={() => update('people', Math.max(1, (parseInt(data.people) || 1) - 1))}
          className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
        >
          −
        </button>
        <div className="text-5xl font-bold text-emerald-600 w-16 text-center">
          {data.people || 1}
        </div>
        <button
          onClick={() => update('people', (parseInt(data.people) || 1) + 1)}
          className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
        >
          +
        </button>
      </div>
      <p className="text-center text-sm text-gray-500">{data.people <= 1 || !data.people ? 'Just me' : `${data.people} people`}</p>
      <div className="bg-teal-50 rounded-xl p-4 text-sm text-teal-700">
        🎉 You're almost done! Click <strong>Generate my diet</strong> to get your personalized plan.
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-gray-700">Dietopia</span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <ProgressBar current={step} total={TOTAL_STEPS} />

          {/* Step content */}
          <div className="min-h-[300px]">
            {steps[step - 1]}
          </div>

          {/* Profile visual (shown after step 2) */}
          {step >= 2 && (
            <div className="mt-6">
              <ProfileVisual data={data} />
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex-1 flex gap-2">
              {step >= 5 && step < TOTAL_STEPS && (
                <button
                  onClick={handleGenerateNow}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Generate diet now ✨
                </button>
              )}
              {step < TOTAL_STEPS ? (
                <button
                  onClick={handleNext}
                  className={`flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold transition-all
                    ${step >= 5 ? 'px-4 border border-emerald-300 text-emerald-700 hover:bg-emerald-50' : 'flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'}`}
                >
                  {step >= 5 ? 'Continue personalizing' : 'Continue'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Generate my diet! 🚀
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
