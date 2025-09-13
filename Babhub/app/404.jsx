import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function NotFoundScreen() {
  const router = useRouter();
  const { userToken } = useAuth();

  const handleGoHome = () => {
    if (userToken) {
      router.replace('/(tabs)/HomeScreen');
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/755/755014.png' }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.subtitle}>
        Oops! The page you're looking for doesn't exist.
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>
          {userToken ? 'Back to Home' : 'Go to Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.6,
    height: height * 0.3,
    marginBottom: 30,
  },
  title: {
    fontSize: width < 400 ? 24 : 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: width < 400 ? 14 : 16,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#3366FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});