import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AppLayout from '../components/AppLayout';
import { User, ChevronRight, Edit2, Check, LogOut, Settings, Shield, Bell } from 'lucide-react';
import { dietGoals, dietTypes } from '../data/mockData';

export default function Profile() {
  const navigate = useNavigate();
  const { profile, updateProfile, logout } = useApp();
  const [editing, setEditing] = useState(null);
  const [tempVal, setTempVal] = useState('');

  const startEdit = (field, val) => {
    setEditing(field);
    setTempVal(val);
  };

  const saveEdit = () => {
    updateProfile({ [editing]: tempVal });
    setEditing(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const fields = [
    { key: 'name', label: 'Full Name', value: profile.name, type: 'text' },
    { key: 'email', label: 'Email', value: profile.email, type: 'email' },
    { key: 'weight', label: 'Weight', value: `${profile.weight} kg`, raw: profile.weight, type: 'number', unit: 'kg' },
    { key: 'height', label: 'Height', value: `${profile.height} cm`, raw: profile.height, type: 'number', unit: 'cm' },
    { key: 'age', label: 'Age', value: `${profile.age} years`, raw: profile.age, type: 'number', unit: 'years' },
    { key: 'budget', label: 'Weekly budget', value: `€${profile.budget}`, raw: profile.budget, type: 'number', unit: '€' },
  ];

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-400">Manage your personal information</p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center py-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-3">
            {profile.avatar || profile.name.slice(0, 2).toUpperCase()}
          </div>
          <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
          <p className="text-sm text-gray-400">{profile.email}</p>
          <div className="flex gap-2 mt-3">
            <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">{profile.goal}</span>
            <span className="bg-teal-100 text-teal-700 text-xs px-3 py-1 rounded-full font-medium">{profile.dietType}</span>
          </div>
        </div>

        {/* Personal info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">Personal Information</p>
          </div>
          {fields.map(f => (
            <div key={f.key} className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0">
              <div className="flex-1">
                <p className="text-xs text-gray-400">{f.label}</p>
                {editing === f.key ? (
                  <div className="flex items-center gap-2 mt-0.5">
                    <input
                      type={f.type}
                      value={tempVal}
                      onChange={e => setTempVal(e.target.value)}
                      className="flex-1 text-sm border border-emerald-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      autoFocus
                    />
                    {f.unit && <span className="text-xs text-gray-400">{f.unit}</span>}
                    <button onClick={saveEdit} className="p-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{f.value}</p>
                )}
              </div>
              {editing !== f.key && (
                <button
                  onClick={() => startEdit(f.key, f.raw ?? f.value)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Diet preferences */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">Diet Preferences</p>
          </div>
          <div className="px-4 py-3.5 border-b border-gray-50">
            <p className="text-xs text-gray-400 mb-2">Goal</p>
            <div className="flex flex-wrap gap-1.5">
              {dietGoals.map(g => (
                <button
                  key={g.value}
                  onClick={() => updateProfile({ goal: g.label })}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all
                    ${profile.goal === g.label ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-600 hover:border-emerald-300'}`}
                >
                  {g.emoji} {g.label}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-3.5">
            <p className="text-xs text-gray-400 mb-2">Diet Type</p>
            <div className="flex flex-wrap gap-1.5">
              {dietTypes.map(d => (
                <button
                  key={d.value}
                  onClick={() => updateProfile({ dietType: d.label })}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all
                    ${profile.dietType === d.label ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-600 hover:border-emerald-300'}`}
                >
                  {d.emoji} {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {[
            { icon: Bell, label: 'Notifications', path: '/notifications' },
            { icon: Shield, label: 'Privacy & Security', path: '/profile' },
            { icon: Settings, label: 'App Settings', path: '/profile' },
          ].map(({ icon: Icon, label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-gray-500" />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-800">{label}</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-medium hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>

        <div className="h-4" />
      </div>
    </AppLayout>
  );
}
