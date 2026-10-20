export const initialState = { user: null, cart: [] };

export function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_TO_CART': {
      const found = state.cart.find((item) => item.id === action.payload.id);
      const cart = found
        ? state.cart.map((item) => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.cart, { ...action.payload, quantity: 1 }];
      return { ...state, cart };
    }
    case 'UPDATE_QUANTITY':
      return { ...state, cart: state.cart.map((item) => item.id === action.payload.id ? { ...item, quantity: Math.max(1, action.payload.quantity) } : item) };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}
