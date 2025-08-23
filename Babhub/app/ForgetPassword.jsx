// app/ForgetPassword.jsx
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Mybutton from '../components/Mybutton';
import DateTimePicker from '@react-native-community/datetimepicker';

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [date, setDate] = useState(new Date());
  const [emailFocus, setEmailFocus] = useState(false);
  const [dobFocus, setDobFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Format date to DD/MM/YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle date change from picker
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep open on iOS, close on Android
    if (selectedDate) {
      setDate(selectedDate);
      setDob(formatDate(selectedDate));
    }
  };

  // Show date picker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // In a real app, this would be an API call to your backend
  const verifyCredentials = async (email, dob) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock verification - for testing, accept "123" as email and "10/03/2003" as DOB
    const validCredentials = 
      (email === 'user@example.com' && dob === '01/01/1990') || 
      (email === '123' && dob === '10/03/2003');
    
    return validCredentials;
  };

  const handleRecoverPassword = async () => {
    // Simple validation
    if (!email || !dob) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate email format (skip if using test value "123")
    if (email !== '123') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }
    }

    // Validate date format (simple check)
    if (dob.length < 8) {
      Alert.alert('Error', 'Please enter a valid date of birth');
      return;
    }

    setLoading(true);
    
    try {
      // Verify credentials (this would be an API call in a real app)
      const isValid = await verifyCredentials(email, dob);
      
      if (isValid) {
        // Navigate to reset password page with email as parameter
        router.push({
          pathname: '/ResetPassword',
          params: { email }
        });
      } else {
        Alert.alert(
          'Verification Failed',
          'The email and date of birth combination is incorrect. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred during verification. Please try again later.'
      );
    } finally {
      setLoading(false);
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
        editable={!loading}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={showDatepicker} disabled={loading}>
        <View pointerEvents="none">
          <TextInput
            placeholder="DD/MM/YYYY"
            style={[styles.input, dobFocus && styles.inputActive]}
            value={dob}
            onFocus={() => setDobFocus(true)}
            onBlur={() => setDobFocus(false)}
            underlineColorAndroid="transparent"
            selectionColor="#3366FF"
            editable={false}
          />
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
          maximumDate={new Date()}
          textColor="#000"
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#3366FF" style={styles.loader} />
      ) : (
        <Mybutton btntitle="Recover Password" onPress={handleRecoverPassword} />
      )}

      <TouchableOpacity onPress={handleBackToLogin} disabled={loading}>
        <Text style={[styles.backToLogin, loading && styles.disabledText]}>
          Back to Login
        </Text>
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
  loader: {
    marginVertical: 20,
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