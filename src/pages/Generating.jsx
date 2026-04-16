import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const messages = [
  { text: "Analyzing your profile...", emoji: "🧬" },
  { text: "Calculating your caloric needs...", emoji: "⚡" },
  { text: "Optimizing your health goals...", emoji: "💪" },
  { text: "Finding best recipes for you...", emoji: "🍽️" },
  { text: "Comparing supermarket prices...", emoji: "🛒" },
  { text: "Finding best prices near you...", emoji: "💰" },
  { text: "Building your shopping list...", emoji: "📋" },
  { text: "Almost ready!", emoji: "✨" },
];

export default function Generating() {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => {
        if (i < messages.length - 1) return i + 1;
        clearInterval(interval);
        return i;
      });
      setProgress(p => Math.min(p + 100 / messages.length, 100));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, messages.length * 600 + 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => {
        navigate('/diet');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [done, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-md w-full">
        {/* Animated icon */}
        <div className={`w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 transition-transform duration-500 ${done ? 'scale-125' : 'scale-100'}`}>
          {done ? (
            <span className="text-5xl">✅</span>
          ) : (
            <span className="text-5xl animate-bounce">{messages[msgIndex]?.emoji}</span>
          )}
        </div>

        {/* Message */}
        <div className="h-12 flex items-center justify-center mb-8">
          <p className={`text-xl font-semibold transition-all duration-500 ${done ? 'scale-110' : ''}`}>
            {done ? 'Your diet is ready! 🎉' : messages[msgIndex]?.text}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-2.5 mb-6">
          <div
            className="bg-white rounded-full h-2.5 transition-all duration-500"
            style={{ width: `${done ? 100 : progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-4 gap-2 mt-8">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`bg-white/10 rounded-xl p-3 transition-all duration-300 ${i <= msgIndex ? 'bg-white/25 scale-105' : ''}`}
            >
              <span className={`text-xl transition-all ${i <= msgIndex ? '' : 'opacity-40'}`}>{m.emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
