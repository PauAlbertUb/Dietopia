import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { mockNotifications } from '../data/mockData';
import { Bell, TrendingUp, Lightbulb, AlertCircle, Check } from 'lucide-react';

const iconMap = {
  reminder: Bell,
  saving: TrendingUp,
  goal: AlertCircle,
  tip: Lightbulb,
};

const colorMap = {
  reminder: 'text-blue-500 bg-blue-50',
  saving: 'text-green-500 bg-green-50',
  goal: 'text-purple-500 bg-purple-50',
  tip: 'text-yellow-500 bg-yellow-50',
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-400">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-sm text-emerald-600 font-medium hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Notifications list */}
        <div className="space-y-2">
          {notifications.map(n => {
            const Icon = iconMap[n.type] || Bell;
            const colors = colorMap[n.type] || 'text-gray-500 bg-gray-50';
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200
                  ${n.read ? 'bg-white border-gray-100' : 'bg-emerald-50/50 border-emerald-100'} hover:shadow-sm`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colors}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</p>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-xs text-gray-300 mt-1">{n.time}</p>
                </div>
                {n.read && <Check className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>

        {notifications.every(n => n.read) && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-gray-500 text-sm">All caught up!</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
