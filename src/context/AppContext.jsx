import { createContext, useContext, useState } from 'react';
import { mockProfile, mockDiet, mockShoppingList } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(mockProfile);
  const [diet, setDiet] = useState(null);
  const [shoppingList, setShoppingList] = useState(null);
  const [currentDay, setCurrentDay] = useState(3);
  const [favorites, setFavorites] = useState([]);

  const login = (email) => {
    setUser({ email, name: profile.name });
  };

  const logout = () => {
    setUser(null);
  };

  const generateDiet = () => {
    setDiet(mockDiet);
    setShoppingList(mockShoppingList);
  };

  const toggleItemOwned = (supermarketId, itemId) => {
    setShoppingList(prev => ({
      ...prev,
      supermarkets: prev.supermarkets.map(sm =>
        sm.id === supermarketId
          ? { ...sm, items: sm.items.map(item => item.id === itemId ? { ...item, owned: !item.owned } : item) }
          : sm
      ),
    }));
  };

  const switchToCheaper = (supermarketId, itemId) => {
    setShoppingList(prev => ({
      ...prev,
      supermarkets: prev.supermarkets.map(sm =>
        sm.id === supermarketId
          ? {
              ...sm,
              subtotal: sm.subtotal - (sm.items.find(i => i.id === itemId)?.price || 0) + (sm.items.find(i => i.id === itemId)?.cheaper?.price || 0),
              items: sm.items.map(item =>
                item.id === itemId && item.cheaper
                  ? { ...item, name: item.cheaper.name, price: item.cheaper.price, cheaper: null }
                  : item
              ),
            }
          : sm
      ),
    }));
  };

  const toggleFavorite = (meal) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === meal.id);
      if (exists) return prev.filter(f => f.id !== meal.id);
      return [...prev, meal];
    });
  };

  const isFavorite = (mealId) => favorites.some(f => f.id === mealId);

  const updateProfile = (data) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      profile, updateProfile,
      diet, generateDiet,
      shoppingList, toggleItemOwned, switchToCheaper,
      currentDay, setCurrentDay,
      favorites, toggleFavorite, isFavorite,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
