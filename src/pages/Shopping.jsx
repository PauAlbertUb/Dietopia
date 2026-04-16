import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AppLayout from '../components/AppLayout';
import { ChevronDown, ChevronUp, Check, RefreshCw, ArrowLeftRight, Filter, MapPin } from 'lucide-react';

function ShoppingItem({ item, supermarketId, onToggle, onCheaper }) {
  const [switching, setSwitching] = useState(false);

  const handleCheaper = async () => {
    setSwitching(true);
    await new Promise(r => setTimeout(r, 700));
    onCheaper(supermarketId, item.id);
    setSwitching(false);
  };

  return (
    <div className={`flex items-center gap-3 py-3 px-1 border-b border-gray-50 last:border-0 transition-all ${item.owned ? 'opacity-50' : ''}`}>
      <button
        onClick={() => onToggle(supermarketId, item.id)}
        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
          ${item.owned ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-400'}`}
      >
        {item.owned && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${item.owned ? 'line-through text-gray-400' : 'text-gray-800'}`}>{item.name}</p>
        <p className="text-xs text-gray-400">{item.quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        {item.cheaper && !item.owned && (
          <button
            onClick={handleCheaper}
            disabled={switching}
            className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
          >
            {switching ? (
              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <ArrowLeftRight className="w-3 h-3" />
            )}
            €{item.cheaper.price.toFixed(2)}
          </button>
        )}
        <span className={`text-sm font-semibold ${item.owned ? 'text-gray-300 line-through' : 'text-gray-900'}`}>
          €{item.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function SupermarketSection({ sm, onToggle, onCheaper }) {
  const [expanded, setExpanded] = useState(true);
  const colors = {
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100' },
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100' },
  };
  const c = colors[sm.color] || colors.green;
  const ownedCount = sm.items.filter(i => i.owned).length;

  return (
    <div className={`rounded-2xl border ${c.border} overflow-hidden`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center gap-3 p-4 ${c.bg} text-left`}
      >
        <span className="text-2xl">{sm.logo}</span>
        <div className="flex-1">
          <p className={`font-semibold ${c.text}`}>{sm.name}</p>
          <p className="text-xs text-gray-500">{sm.items.length} items · {ownedCount} have</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`${c.badge} ${c.text} text-sm font-bold px-3 py-1 rounded-xl`}>€{sm.subtotal.toFixed(2)}</span>
          {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </button>
      {expanded && (
        <div className="bg-white px-4">
          {sm.items.map(item => (
            <ShoppingItem
              key={item.id}
              item={item}
              supermarketId={sm.id}
              onToggle={onToggle}
              onCheaper={onCheaper}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Shopping() {
  const navigate = useNavigate();
  const { shoppingList, toggleItemOwned, switchToCheaper } = useApp();
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleOptimize = async () => {
    setOptimizing(true);
    await new Promise(r => setTimeout(r, 1500));
    setOptimizing(false);
    setOptimized(true);
  };

  if (!shoppingList) {
    return (
      <AppLayout>
        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No shopping list yet</h2>
          <p className="text-gray-500 text-sm mb-6">Generate your diet first to get a personalized shopping list.</p>
          <button
            onClick={() => navigate('/onboarding')}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            Get started
          </button>
        </div>
      </AppLayout>
    );
  }

  const totalOwned = shoppingList.supermarkets.flatMap(s => s.items).filter(i => i.owned).length;
  const totalItems = shoppingList.supermarkets.flatMap(s => s.items).length;

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-gray-900">Shopping List</h1>
          <p className="text-sm text-gray-400">Optimized for {shoppingList.supermarkets.length} supermarkets</p>
        </div>

        {/* Summary card */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">€{(optimized ? shoppingList.optimizedPrice : shoppingList.totalPrice).toFixed(2)}</p>
              <p className="text-xs opacity-80">Total cost</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-300">€{shoppingList.savings.toFixed(2)}</p>
              <p className="text-xs opacity-80">Savings</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{totalOwned}/{totalItems}</p>
              <p className="text-xs opacity-80">Items owned</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-white/20 rounded-full h-1.5">
              <div className="bg-white rounded-full h-1.5 transition-all duration-500" style={{ width: `${(totalOwned / totalItems) * 100}%` }} />
            </div>
            <p className="text-xs opacity-70 mt-1">{Math.round((totalOwned / totalItems) * 100)}% items already owned</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleOptimize}
            disabled={optimizing || optimized}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {optimizing ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Optimizing...
              </>
            ) : optimized ? (
              <><Check className="w-4 h-4" /> Optimized!</>
            ) : (
              <><RefreshCw className="w-4 h-4" /> Optimize shopping</>
            )}
          </button>
          <button
            onClick={() => navigate('/guided-shopping')}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-xl text-sm font-medium hover:border-emerald-300 hover:bg-emerald-50 transition-all"
          >
            <MapPin className="w-4 h-4" />
            Guide me
          </button>
        </div>

        {/* Savings tip */}
        {!optimized && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-yellow-500">💡</span>
            <p className="text-sm text-yellow-700">
              Switch to cheaper alternatives to save an additional <strong>€{(shoppingList.totalPrice - shoppingList.optimizedPrice).toFixed(2)}</strong>!
            </p>
          </div>
        )}

        {/* Supermarket sections */}
        <div className="space-y-3">
          {shoppingList.supermarkets.map(sm => (
            <SupermarketSection
              key={sm.id}
              sm={sm}
              onToggle={toggleItemOwned}
              onCheaper={switchToCheaper}
            />
          ))}
        </div>

        <div className="h-4" />
      </div>
    </AppLayout>
  );
}
