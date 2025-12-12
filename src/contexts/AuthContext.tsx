import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  getCurrentUser,
  login as dbLogin,
  logout as dbLogout,
  createUser,
  updateUser,
  setCurrentUser,
  initializeDatabase,
} from '@/lib/localDatabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  bloodType: string;
  phone: string;
  location: string;
  role: 'donor' | 'seeker';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize database and check for existing session
    initializeDatabase();
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const loggedInUser = dbLogin(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (userData: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      const newUser = createUser({
        ...userData,
        isAvailable: userData.role === 'donor',
        donationCount: 0,
        lastDonation: null,
      });
      setCurrentUser(newUser);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to create account' };
    }
  };

  const logout = () => {
    dbLogout();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    const updatedUser = updateUser(user.id, updates);
    if (updatedUser) {
      setCurrentUser(updatedUser);
      setUser(updatedUser);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
