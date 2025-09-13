// app/ForgetPassword.jsx (updated with secure flow)
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Mybutton from '../components/Mybutton';
import { useAuth } from './contexts/AuthContext';

const ForgetPassword = () => {
  const router = useRouter();
  const { setPasswordRecoveryData } = useAuth();
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [dobFocus, setDobFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecoverPassword = async () => {
    // Simple validation
    if (!email || !dob) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Validate date format (simple check)
    if (dob.length < 6) {
      Alert.alert('Error', 'Please enter a valid date of birth');
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real app, you would verify credentials with your backend
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate checking if credentials match (in real app, this would be API call)
      // For demo, we'll assume they're correct
      const recoveredPassword = 'Recovered@123';
      
      // Generate secure recovery token and store data
      const token = setPasswordRecoveryData(email, dob, recoveredPassword);
      
      // Navigate to the review page with token as parameter
      router.push({
        pathname: '/PasswordReview',
        params: { token }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to recover password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Recover Password</Text>
      <Text style={styles.subHeader}>
        Enter your email and date of birth to recover your password
      </Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="hello@example.com"
        style={[styles.input, emailFocus && styles.inputActive]}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        underlineColorAndroid="transparent"
        selectionColor="#3366FF"
        autoCapitalize="none"
        editable={!isLoading}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        placeholder="DD/MM/YYYY"
        style={[styles.input, dobFocus && styles.inputActive]}
        value={dob}
        onChangeText={setDob}
        onFocus={() => setDobFocus(true)}
        onBlur={() => setDobFocus(false)}
        underlineColorAndroid="transparent"
        selectionColor="#3366FF"
        editable={!isLoading}
      />

      <Mybutton 
        btntitle={isLoading ? "Verifying..." : "Recover Password"} 
        onPress={handleRecoverPassword}
        disabled={isLoading}
      />

      <TouchableOpacity onPress={handleBackToLogin} disabled={isLoading}>
        <Text style={[styles.backToLogin, isLoading && styles.disabledText]}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#222',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 14,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 18,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  inputActive: {
    borderColor: '#3366FF',
  },
  backToLogin: {
    color: '#3366FF',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '600',
    fontSize: 14,
  },
  disabledText: {
    opacity: 0.5,
  },
});

export default ForgetPassword;