import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderDate'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePaymentStatus: (orderId: string, paymentStatus: Order['paymentStatus']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data storage
const USERS_KEY = 'aurabags_users';
const ORDERS_KEY = 'aurabags_orders';
const CURRENT_USER_KEY = 'aurabags_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load user and orders from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser) as User;
        setUser(userData);
        loadUserOrders(userData.id);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  const loadUserOrders = (userId: string) => {
    const savedOrders = localStorage.getItem(ORDERS_KEY);
    if (savedOrders) {
      try {
        const allOrders = JSON.parse(savedOrders) as Order[];
        const userOrders = allOrders.filter(order => order.userId === userId);
        setOrders(userOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()));
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
      }
    }
  };

  const saveUsersToStorage = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const saveOrdersToStorage = (orders: Order[]) => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  };

  const getUsersFromStorage = (): User[] => {
    const savedUsers = localStorage.getItem(USERS_KEY);
    try {
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error('Error parsing users from localStorage:', error);
      return [];
    }
  };

  const getAllOrdersFromStorage = (): Order[] => {
    const savedOrders = localStorage.getItem(ORDERS_KEY);
    try {
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Error parsing orders from localStorage:', error);
      return [];
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      // In a real app, you'd verify the password hash
      setUser(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
      loadUserOrders(foundUser.id);
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<boolean> => {
    const users = getUsersFromStorage();
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsersToStorage(users);
    
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setOrders([]);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    // Update in users storage
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      saveUsersToStorage(users);
    }
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'orderDate'>): string => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString()
    };

    const allOrders = getAllOrdersFromStorage();
    allOrders.push(newOrder);
    saveOrdersToStorage(allOrders);

    if (user && orderData.userId === user.id) {
      setOrders(prev => [newOrder, ...prev]);
    }

    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const allOrders = getAllOrdersFromStorage();
    const orderIndex = allOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      allOrders[orderIndex].status = status;
      saveOrdersToStorage(allOrders);

      if (user) {
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status } : order
        ));
      }
    }
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus']) => {
    const allOrders = getAllOrdersFromStorage();
    const orderIndex = allOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      allOrders[orderIndex].paymentStatus = paymentStatus;
      saveOrdersToStorage(allOrders);

      if (user) {
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, paymentStatus } : order
        ));
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateUser,
      orders,
      addOrder,
      updateOrderStatus,
      updatePaymentStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
