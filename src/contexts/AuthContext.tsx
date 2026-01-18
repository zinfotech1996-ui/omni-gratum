
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Employee {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'employee';
  phone: string;
  position: string;
  status: string;
  hire_date: string;
}

interface AuthContextType {
  user: Employee | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('omnigratum_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase.functions.invoke('omni-gratum-api', {
        body: { action: 'login', data: { email, password } }
      });

      if (error || data?.error) {
        return { success: false, error: data?.error || 'Anmeldung fehlgeschlagen' };
      }

      setUser(data.employee);
      localStorage.setItem('omnigratum_user', JSON.stringify(data.employee));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Verbindungsfehler' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('omnigratum_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin: user?.role === 'admin' }}>
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
