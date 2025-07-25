import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

interface CartContextType {
  cart: CartState;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (productId: number, color?: string) => void;
  updateQuantity: (productId: number, quantity: number, color?: string) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
}

type CartAction = 
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number; color?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number; color?: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId && item.color === action.payload.color
      );

      let newItems;
      if (existingItemIndex !== -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }

      const newState = {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: newItems.reduce((sum, item) => {
          const price = parseFloat(item.price.replace('$', ''));
          return sum + (price * item.quantity);
        }, 0)
      };

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newState;
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(
        item => !(item.productId === action.payload.productId && item.color === action.payload.color)
      );

      const newState = {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: newItems.reduce((sum, item) => {
          const price = parseFloat(item.price.replace('$', ''));
          return sum + (price * item.quantity);
        }, 0)
      };

      localStorage.setItem('cart', JSON.stringify(newItems));
      return newState;
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.productId === action.payload.productId && item.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      const newState = {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: newItems.reduce((sum, item) => {
          const price = parseFloat(item.price.replace('$', ''));
          return sum + (price * item.quantity);
        }, 0)
      };

      localStorage.setItem('cart', JSON.stringify(newItems));
      return newState;
    }

    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0
      };

    case 'LOAD_CART': {
      const newState = {
        items: action.payload,
        totalItems: action.payload.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: action.payload.reduce((sum, item) => {
          const price = parseFloat(item.price.replace('$', ''));
          return sum + (price * item.quantity);
        }, 0)
      };
      return newState;
    }

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart) as CartItem[];
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const cartItem: CartItem = {
      ...item,
      quantity: item.quantity || 1,
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const removeFromCart = (productId: number, color?: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, color } });
  };

  const updateQuantity = (productId: number, quantity: number, color?: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, color } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartItemCount = () => cart.totalItems;

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
