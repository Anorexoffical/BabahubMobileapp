

// app/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null); // 👈 store the whole user object
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userJson = await AsyncStorage.getItem('user'); // 👈 retrieve user
        setUserToken(token);
        setUser(userJson ? JSON.parse(userJson) : null);
      } catch (e) {
        console.error('Failed to restore auth data', e);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (token, userData) => { // 👈 accept full user object
      setUserToken(token);
      setUser(userData);
      try {
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(userData)); // 👈 save user
      } catch (e) {
        console.error('Failed to save auth data', e);
      }
    },
    signOut: async () => {
      setUserToken(null);
      setUser(null);
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
      } catch (e) {
        console.error('Failed to remove auth data', e);
      }
    },
    userToken,
    user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
