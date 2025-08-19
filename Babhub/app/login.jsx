// app/login.jsx
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Mybutton from '../components/Mybutton';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from './contexts/AuthContext';

const Login = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [checked, setChecked] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simple validation function
  const validateInputs = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your authentication API here
      // For demo purposes, we'll accept any email/password that passes validation
      const authToken = 'mock-jwt-token-' + Date.now();
      
      // Sign in using the auth context
      await signIn(authToken, email);
      
      // Navigate to main app
      router.replace('/(tabs)/HomeScreen');
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push('/CreateAccount'); // You'll need to create this screen
  };
  
  const forgetpassword = () => {
    router.push('/ForgetPassword'); // You'll need to create this screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.subHeader}>Please log in to your account</Text>

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

      <Text style={styles.label}>Password</Text>
      <Pressable
        style={[styles.passwordInputContainer, passwordFocus && styles.inputActive]}
      >
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
          editable={!isLoading}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <MaterialIcons
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </Pressable>

      <TouchableOpacity
        style={styles.customCheckboxContainer}
        onPress={() => setChecked(!checked)}
        activeOpacity={0.8}
        disabled={isLoading}
      >
        <View style={[styles.customCheckbox, checked && styles.customCheckboxChecked]}>
          {checked && <MaterialIcons name="check" size={16} color="#fff" />}
        </View>
        <Text style={styles.checkboxLabel}>Keep me signed in</Text>
      </TouchableOpacity>

      <TouchableOpacity disabled={isLoading}>
        <Text style={styles.forgotText} onPress={forgetpassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator size="large" color="#3366FF" style={styles.loader} />
      ) : (
        <Mybutton btntitle="Login" onPress={handleLogin} />
      )}

    

      <TouchableOpacity onPress={handleCreateAccount} disabled={isLoading}>
        <Text style={styles.createAccount}>Don't have an account? Create one</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 6,
    color: '#222',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
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
  customCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  customCheckbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 6,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  customCheckboxChecked: {
    backgroundColor: '#3366FF',
    borderColor: '#3366FF',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  forgotText: {
    color: '#3366FF',
    fontSize: 13,
    marginBottom: 30,
    textAlign: 'right',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#f1f1f1',
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  googleIconColorful: {
    marginRight: 10,
    color: '#DB4437',
  },
  googleText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  createAccount: {
    color: '#3366FF',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
    fontSize: 14,
  },
  loader: {
    marginVertical: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default Login;