import { useAuth } from './AuthContext';
import { Redirect, useRouter } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { userToken, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userToken) {
      // Use replace instead of redirect to avoid history issues
      router.replace('/login');
    }
  }, [userToken, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3366FF" />
      </View>
    );
  }

  if (!userToken) {
    return null; // Will redirect due to useEffect
  }

  return children;
}