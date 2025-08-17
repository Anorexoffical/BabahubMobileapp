// app/(tabs)/_layout.jsx

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#007BFF', // Blue for active
          tabBarInactiveTintColor: '#000000', // Black for inactive
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = '';

            if (route.name === 'HomeScreen') {
              iconName = 'home-outline';
            } else if (route.name === 'StoreScreen') {
              iconName = 'bag-outline';
            } else if (route.name === 'WishlistScreen') {
              iconName = 'heart-outline';
            } else if (route.name === 'ProfileScreen') {
              iconName = 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="HomeScreen" options={{ title: 'Home' }} />
        <Tabs.Screen name="StoreScreen" options={{ title: 'Store' }} />
        <Tabs.Screen name="WishlistScreen" options={{ title: 'Wishlist' }} />
        <Tabs.Screen name="ProfileScreen" options={{ title: 'Profile' }} />
      </Tabs>

      {/* Toast notification support */}
      <Toast />
    </>
  );
}
