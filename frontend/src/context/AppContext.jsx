import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const AppContext = createContext(null);
const CART_KEY = "tahas-bite-cart";

function readCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const initialState = { cart: readCart() };

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existing = state.cart.find((item) => item.id === product.id);
      const cart = existing
        ? state.cart.map((item) => item.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item)
        : [...state.cart, { ...product, quantity: 1 }];
      return { ...state, cart };
    }
    case "UPDATE_QUANTITY": {
      const quantity = Number(action.payload.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) {
        return { ...state, cart: state.cart.filter((item) => item.id !== action.payload.id) };
      }
      return {
        ...state,
        cart: state.cart.map((item) => item.id === action.payload.id ? { ...item, quantity: Math.min(quantity, 99) } : item),
      };
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState(() => localStorage.getItem("tahas-bite-theme") || "light");

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("tahas-bite-theme", theme);
  }, [theme]);

  const cartTotal = useMemo(
    () => state.cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [state.cart]
  );
  const cartCount = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    [state.cart]
  );

  const value = { cart: state.cart, dispatch, cartTotal, cartCount, theme, setTheme };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider.");
  return context;
}
