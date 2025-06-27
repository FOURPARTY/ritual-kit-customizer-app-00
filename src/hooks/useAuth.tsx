
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    const name = localStorage.getItem('userName') || '';
    
    setIsAuthenticated(authStatus);
    setUserEmail(email);
    setUserName(name);
  }, []);

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('loginMethod');
    setIsAuthenticated(false);
    setUserEmail('');
    setUserName('');
  };

  return {
    isAuthenticated,
    userEmail,
    userName,
    logout
  };
};
