import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Leaf, ShoppingCart, Zap, Star, ArrowRight } from 'lucide-react';

const features = [
  { icon: '💰', title: 'Save up to 40€/month', desc: 'Smart supermarket comparison', color: 'bg-green-100 text-green-700', delay: '0s' },
  { icon: '⚡', title: 'Diet ready in 2 minutes', desc: 'AI-powered personalization', color: 'bg-yellow-100 text-yellow-700', delay: '0.3s' },
  { icon: '🛒', title: 'Optimized shopping', desc: 'Logical store routing', color: 'bg-blue-100 text-blue-700', delay: '0.6s' },
  { icon: '🥗', title: '100+ weekly recipes', desc: 'Tailored to your taste', color: 'bg-purple-100 text-purple-700', delay: '0.9s' },
];

const testimonials = [
  { name: 'María G.', text: 'I save 45€ every month and eat better than ever!', stars: 5, avatar: 'MG' },
  { name: 'Carlos R.', text: 'Setup took 2 minutes, the diet fits perfectly.', stars: 5, avatar: 'CR' },
  { name: 'Laura M.', text: 'The shopping list feature is a game changer!', stars: 5, avatar: 'LM' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Dietopia
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/signin')}
            className="text-gray-600 hover:text-emerald-600 font-medium transition-colors px-4 py-2 rounded-xl hover:bg-emerald-50"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/onboarding')}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI-Powered Nutrition · 10,000+ happy users
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your personal diet,
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              done in 2 minutes
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Dietopia creates personalized meal plans, generates optimized shopping lists,
            and helps you save money — all powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/onboarding')}
              className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Join them
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-1"
            >
              Already have an account? <span className="text-emerald-600 font-semibold">Sign in</span>
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">Free to start · No credit card required</p>
        </div>

        {/* Floating Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {features.map((f, i) => (
            <div
              key={i}
              className={`${f.color} rounded-2xl p-5 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default`}
              style={{ animationDelay: f.delay }}
            >
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="font-semibold text-sm">{f.title}</div>
              <div className="text-xs opacity-70 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works</h2>
            <p className="text-gray-500">Three simple steps to your perfect diet</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Tell us about you', desc: 'Share your goals, restrictions, and budget in 2 minutes.', emoji: '📋' },
              { step: '02', title: 'AI generates your diet', desc: 'Get a personalized weekly meal plan tailored to you.', emoji: '🤖' },
              { step: '03', title: 'Shop & save', desc: 'Get an optimized shopping list across top supermarkets.', emoji: '💰' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {s.emoji}
                </div>
                <div className="text-emerald-500 font-bold text-sm mb-2">{s.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-emerald-500 to-teal-500 py-16">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center text-white">
          {[
            { value: '10K+', label: 'Happy users' },
            { value: '40€', label: 'Avg. monthly savings' },
            { value: '2 min', label: 'Setup time' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-4xl font-bold">{s.value}</div>
              <div className="text-emerald-100 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What people say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-3">
                  {Array(t.stars).fill(null).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to transform your diet?</h2>
          <p className="text-gray-500 mb-8">Join thousands of people who eat better and spend less.</p>
          <button
            onClick={() => navigate('/onboarding')}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Start for free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-white">Dietopia</span>
          </div>
          <p className="text-sm">© 2025 Dietopia · Built with ❤️ for healthier living</p>
        </div>
      </footer>
    </div>
  );
}
