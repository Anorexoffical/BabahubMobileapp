// app/CreateAccount.jsx
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CreateAccount = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [dobFocus, setDobFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleCreateAccount = () => {
    // Validation
    if (!name || !email || !dob || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // In a real app, you would call your API here to create the account
    Alert.alert('Success', 'Account created successfully!', [
      {
        text: 'OK',
        onPress: () => router.back(), // Go back to login after success
      },
    ]);
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subHeader}>
        Fill in your details to create a new account
      </Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        placeholder="John Doe"
        style={[styles.input, nameFocus && styles.inputActive]}
        value={name}
        onChangeText={setName}
        onFocus={() => setNameFocus(true)}
        onBlur={() => setNameFocus(false)}
        underlineColorAndroid="transparent"
        selectionColor="#3366FF"
      />

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

      <Text style={styles.label}>Password</Text>
      <View style={[styles.passwordInputContainer, passwordFocus && styles.inputActive]}>
        <TextInput
          placeholder="••••••••"
          style={styles.passwordInput}
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          underlineColorAndroid="transparent"
          selectionColor="#3366FF"
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <MaterialIcons
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm Password</Text>
      <View style={[styles.passwordInputContainer, confirmPasswordFocus && styles.inputActive]}>
        <TextInput
          placeholder="••••••••"
          style={styles.passwordInput}
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onFocus={() => setConfirmPasswordFocus(true)}
          onBlur={() => setConfirmPasswordFocus(false)}
          underlineColorAndroid="transparent"
          selectionColor="#3366FF"
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <MaterialIcons
            name={confirmPasswordVisible ? 'visibility' : 'visibility-off'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <Mybutton btntitle="Create Account" onPress={handleCreateAccount} />

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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    marginBottom: 20,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
    color: '#000',
  },
  backToLogin: {
    color: '#3366FF',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default CreateAccount;