import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Index = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const router = useRouter();

  useEffect(() => {
    // Start the splash animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Wait and fade out
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setSplashVisible(false);
          router.replace('/(tabs)/HomeScreen'); // 👈 Correct routing here
        });
      }, 1500);
    });
  }, []);

  if (isSplashVisible) {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/images/logo.png')}
          style={[
            styles.logo,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
          resizeMode="contain"
        />
      </View>
    );
  }

  return null; // 👈 Don't directly return <HomeScreen />, navigation will handle it
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242323',
  },
  logo: {
    width: 220,
    height: 220,
  },
});
