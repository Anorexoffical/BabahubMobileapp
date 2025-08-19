// app/components/ProtectedRoute.jsx
import { useAuth } from '../contexts/AuthContext';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function ProtectedRoute({ children }) {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3366FF" />
      </View>
    );
  }

  if (!userToken) {
    return <Redirect href="/login" />;
  }

  return children;
}