import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
 
  useEffect(() => {
    const stored = localStorage.getItem('vastra_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('vastra_user');
      }
    }
  }, []);

  const openAuthModal = useCallback((mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const login = useCallback((userData) => {
    const user = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      joinedAt: new Date().toISOString(),
    };
    setUser(user);
    localStorage.setItem('vastra_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
  }, []);

  const signup = useCallback((userData) => {
    const user = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      joinedAt: new Date().toISOString(),
    };
    setUser(user);
    localStorage.setItem('vastra_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('vastra_user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);