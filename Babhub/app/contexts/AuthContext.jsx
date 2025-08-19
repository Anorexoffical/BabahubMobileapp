// app/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const bootstrapAsync = async () => {
      let token, email;
      try {
        token = await AsyncStorage.getItem('userToken');
        email = await AsyncStorage.getItem('userEmail');
      } catch (e) {
        console.error('Failed to restore auth data', e);
      }
      setUserToken(token);
      setUserEmail(email);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (token, email) => {
      setUserToken(token);
      setUserEmail(email);
      try {
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userEmail', email);
      } catch (e) {
        console.error('Failed to save auth data', e);
      }
    },
    signOut: async () => {
      setUserToken(null);
      setUserEmail(null);
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userEmail');
      } catch (e) {
        console.error('Failed to remove auth data', e);
      }
    },
    userToken,
    userEmail,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};