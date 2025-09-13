import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function MissingScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to 404 page
    router.replace('/404');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#3366FF" />
    </View>
  );
}