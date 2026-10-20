import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { appReducer, initialState } from './AppReducer.js';

const AppContext = createContext(null);

function readSavedState() {
  try {
    const user = JSON.parse(localStorage.getItem('tahas-bite-user') || 'null');
    const cart = user?.email ? JSON.parse(localStorage.getItem(`tahas-bite-cart:${user.email}`) || '[]') : [];
    return { user, cart };
  } catch {
    return initialState;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, undefined, readSavedState);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('tahas-bite-user', JSON.stringify(state.user));
      localStorage.setItem(`tahas-bite-cart:${state.user.email}`, JSON.stringify(state.cart));
    } else {
      localStorage.removeItem('tahas-bite-user');
    }
  }, [state.user, state.cart]);

  const value = useMemo(() => ({ ...state, dispatch, cartCount: state.cart.reduce((sum, item) => sum + item.quantity, 0), cartTotal: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
