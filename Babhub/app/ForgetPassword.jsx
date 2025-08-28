// app/ForgetPassword.jsx
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

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [dobFocus, setDobFocus] = useState(false);

  const handleRecoverPassword = () => {
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

    // In a real app, you would call your API here
    // For demo purposes, we'll generate a mock password
    const recoveredPassword = 'Recovered@123';
    setPassword(recoveredPassword);
    setShowPassword(true);
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
      />

      <Mybutton btntitle="Recover Password" onPress={handleRecoverPassword} />

      {showPassword && (
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordLabel}>Your Password:</Text>
          <View style={styles.passwordDisplay}>
            <Text style={styles.passwordText}>{password}</Text>
          </View>
          <Text style={styles.note}>
            Please change your password after logging in for security reasons.
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={handleBackToLogin}>
        <Text style={styles.backToLogin}>Back to Login</Text>
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
  passwordContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  passwordLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  passwordDisplay: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    marginBottom: 10,
  },
  passwordText: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: '600',
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  backToLogin: {
    color: '#3366FF',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ForgetPassword;