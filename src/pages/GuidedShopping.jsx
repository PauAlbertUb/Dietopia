import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AppLayout from '../components/AppLayout';
import { Check, ArrowLeft, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const STORE_ORDER = {
  mercadona: ['dairy', 'meat', 'frozen', 'bakery', 'grains', 'oils', 'vegetables'],
  lidl: ['fish', 'fruit', 'grains', 'nuts', 'snacks'],
  carrefour: ['fish', 'legumes'],
};

export default function GuidedShopping() {
  const navigate = useNavigate();
  const { shoppingList, toggleItemOwned } = useApp();
  const [currentStore, setCurrentStore] = useState(0);
  const [expandedStore, setExpandedStore] = useState(0);

  if (!shoppingList) {
    return (
      <AppLayout>
        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-gray-500">No shopping list available.</p>
          <button onClick={() => navigate('/onboarding')} className="mt-3 text-emerald-600 font-medium">Generate diet first →</button>
        </div>
      </AppLayout>
    );
  }

  const stores = shoppingList.supermarkets.slice(0, 3);

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => navigate('/shopping')}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Guided Shopping</h1>
            <p className="text-sm text-gray-400">Follow the route for each store</p>
          </div>
        </div>

        {/* Store progress */}
        <div className="flex gap-2">
          {stores.map((store, i) => {
            const storeOwned = store.items.filter(it => it.owned).length;
            const storeDone = storeOwned === store.items.length;
            return (
              <button
                key={store.id}
                onClick={() => { setCurrentStore(i); setExpandedStore(i); }}
                className={`flex-1 rounded-xl p-3 text-center border-2 transition-all
                  ${currentStore === i ? 'border-emerald-500 bg-emerald-50' : storeDone ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'}`}
              >
                <div className="text-xl mb-1">{store.logo}</div>
                <p className={`text-xs font-medium ${currentStore === i ? 'text-emerald-700' : storeDone ? 'text-green-600' : 'text-gray-600'}`}>
                  {store.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{storeOwned}/{store.items.length}</p>
                {storeDone && <span className="text-xs text-green-600 font-medium">✓ Done</span>}
              </button>
            );
          })}
        </div>

        {/* Current store route */}
        {stores.map((store, si) => {
          const order = STORE_ORDER[store.id] || [];
          const sortedItems = [...store.items].sort((a, b) => {
            const ai = order.indexOf(a.category);
            const bi = order.indexOf(b.category);
            return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
          });

          // Group by category
          const grouped = sortedItems.reduce((acc, item) => {
            const cat = item.category;
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(item);
            return acc;
          }, {});

          const isExpanded = expandedStore === si;
          const storeOwned = store.items.filter(i => i.owned).length;
          const storeDone = storeOwned === store.items.length;

          return (
            <div key={store.id} className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${currentStore === si ? 'border-emerald-300 shadow-md' : storeDone ? 'border-green-200' : 'border-gray-200'}`}>
              <button
                onClick={() => { setExpandedStore(isExpanded ? -1 : si); setCurrentStore(si); }}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <span className="text-2xl">{store.logo}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{store.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${(storeOwned / store.items.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{storeOwned}/{store.items.length}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {storeDone && <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-lg">Done ✓</span>}
                  <span className="font-bold text-emerald-600">€{store.subtotal.toFixed(2)}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  {/* Store layout hint */}
                  <div className="bg-blue-50 rounded-xl px-3 py-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <p className="text-xs text-blue-700">Items ordered by store layout for efficient shopping</p>
                  </div>

                  {Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 capitalize">
                        {category.replace(/_/g, ' ')} section
                      </p>
                      <div className="space-y-1">
                        {items.map(item => (
                          <button
                            key={item.id}
                            onClick={() => toggleItemOwned(store.id, item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left
                              ${item.owned ? 'bg-emerald-50 border-emerald-200 opacity-60' : 'bg-gray-50 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'}`}
                          >
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                              ${item.owned ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                              {item.owned && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${item.owned ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-400">{item.quantity}</p>
                            </div>
                            <span className={`text-sm font-semibold ${item.owned ? 'text-gray-300 line-through' : 'text-gray-700'}`}>
                              €{item.price.toFixed(2)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {storeDone && si < stores.length - 1 && (
                    <button
                      onClick={() => { setCurrentStore(si + 1); setExpandedStore(si + 1); }}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-medium text-sm hover:shadow-lg hover:scale-[1.02] transition-all"
                    >
                      Next: {stores[si + 1]?.name} →
                    </button>
                  )}
                  {storeDone && si === stores.length - 1 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                      <p className="text-2xl mb-1">🎉</p>
                      <p className="font-semibold text-green-700">Shopping complete!</p>
                      <p className="text-sm text-green-600">You're all done. Great job!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
