// app/ResetPassword.jsx
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Mybutton from '../components/Mybutton';

const ResetPassword = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordFocus, setNewPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  // In a real app, this would be an API call to your backend
  const updatePassword = async (email, newPassword) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock password update - in a real app, this would update the database
    console.log(`Password updated for ${email}`);
    return true;
  };

  const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async () => {
    // Validation
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
      );
      return;
    }

    setLoading(true);
    
    try {
      // Update password (this would be an API call in a real app)
      const success = await updatePassword(email, newPassword);
      
      if (success) {
        Alert.alert(
          'Success',
          'Your password has been reset successfully. You can now login with your new password.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/Login') // Replace with your login route
            }
          ]
        );
      } else {
        Alert.alert(
          'Error',
          'Failed to reset password. Please try again later.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while resetting your password. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Reset Password</Text>
      <Text style={styles.subHeader}>
        Create a new password for {email}
      </Text>

      <Text style={styles.label}>New Password</Text>
      <TextInput
        placeholder="Enter new password"
        style={[styles.input, newPasswordFocus && styles.inputActive]}
        value={newPassword}
        onChangeText={setNewPassword}
        onFocus={() => setNewPasswordFocus(true)}
        onBlur={() => setNewPasswordFocus(false)}
        underlineColorAndroid="transparent"
        selectionColor="#3366FF"
        secureTextEntry
        autoCapitalize="none"
        editable={!loading}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        placeholder="Confirm new password"
        style={[styles.input, confirmPasswordFocus && styles.inputActive]}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onFocus={() => setConfirmPasswordFocus(true)}
        onBlur={() => setConfirmPasswordFocus(false)}
        underlineColorAndroid="transparent"
        selectionColor="#3366FF"
        secureTextEntry
        autoCapitalize="none"
        editable={!loading}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#3366FF" style={styles.loader} />
      ) : (
        <View style={styles.buttonContainer}>
          <Mybutton 
            btntitle="Reset Password" 
            onPress={handleResetPassword} 
            style={styles.resetButton}
          />
          <TouchableOpacity 
            onPress={handleCancel} 
            disabled={loading}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
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
  buttonContainer: {
    marginTop: 10,
  },
  resetButton: {
    marginBottom: 15,
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ResetPassword;