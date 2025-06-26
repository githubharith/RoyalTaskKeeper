import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: User) => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email
    };
    
    // Store user credentials (in real app, this would be handled by backend)
    const credentials = JSON.parse(localStorage.getItem('credentials') || '{}');
    credentials[email] = password;
    localStorage.setItem('credentials', JSON.stringify(credentials));
    
    // Store user data
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const credentials = JSON.parse(localStorage.getItem('credentials') || '{}');
    
    const user = users.find((u: User) => u.email === email);
    const storedPassword = credentials[email];
    
    if (user && storedPassword === password) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setUser(user);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};