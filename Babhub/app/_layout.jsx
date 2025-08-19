// app/_layout.jsx
import { Stack } from 'expo-router';
import { AuthProvider } from './contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="CartScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Checkout" options={{ headerShown: false }} />
        <Stack.Screen name="CustomerSupport" options={{ headerShown: false }} />
        <Stack.Screen name="MyOrder" options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicyScreen" options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetailPage" options={{ headerShown: false }} />
        <Stack.Screen name="ProfileDetailsScreen" options={{ headerShown: false }} />
        // Add these to your Stack.Screen components in app/_layout.jsx
        <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" options={{ headerShown: false }} />
              </Stack>
    </AuthProvider>
  );
}