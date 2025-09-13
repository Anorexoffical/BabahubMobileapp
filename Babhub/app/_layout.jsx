import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

// Component to handle route protection and redirection
function RouteProtection({ children }) {
  const { userToken, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Define protected routes
    const protectedRoutes = [
      '(tabs)', 
      'CartScreen', 
      'Checkout', 
      'CustomerSupport', 
      'MyOrder', 
      'PrivacyPolicyScreen', 
      'ProductDetailPage', 
      'ProfileDetailsScreen', 
      'PasswordReview'
    ];

    // Define public routes
    const publicRoutes = ['index', 'login', 'ForgetPassword', 'CreateAccount', '404'];

    const currentRoute = segments[0] || 'index';
    const isProtectedRoute = protectedRoutes.includes(currentRoute);
    const isPublicRoute = publicRoutes.includes(currentRoute);

    // Redirect to login if trying to access protected route without authentication
    if (isProtectedRoute && !userToken) {
      router.replace('/login');
    }
    
    // Redirect to home if trying to access public auth route while authenticated
    if (userToken && (currentRoute === 'login' || currentRoute === 'CreateAccount')) {
      router.replace('/(tabs)/HomeScreen');
    }

    // Handle 404 for unknown routes
    if (!isProtectedRoute && !isPublicRoute && currentRoute !== '404') {
      router.replace('/404');
    }
  }, [userToken, segments, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3366FF" />
      </View>
    );
  }

  return children;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteProtection>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Public routes */}
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="ForgetPassword" />
          <Stack.Screen name="CreateAccount" />
          
          {/* Protected routes */}
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="CartScreen" />
          <Stack.Screen name="Checkout" />
          <Stack.Screen name="CustomerSupport" />
          <Stack.Screen name="MyOrder" />
          <Stack.Screen name="PrivacyPolicyScreen" />
          <Stack.Screen name="ProductDetailPage" />
          <Stack.Screen name="ProfileDetailsScreen" />
          <Stack.Screen name="PasswordReview" options={{ gestureEnabled: false }} />
          
          {/* 404 page - must be the last route */}
          <Stack.Screen name="404" />
          
          {/* Catch-all route for 404 */}
          <Stack.Screen name="[...missing]" />
        </Stack>
      </RouteProtection>
    </AuthProvider>
  );
}