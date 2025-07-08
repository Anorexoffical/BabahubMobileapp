// app/_layout.jsx

import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen name="CustomerSupport" options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicyScreen" options={{ headerShown: false }} />
        <Stack.Screen name="CartScreen" options={{ headerShown: false }} />
        <Stack.Screen name="MyOrder" options={{ headerShown: false }} />

      </Stack>
      <Toast />
    </>
  );
}
