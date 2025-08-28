import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ClipboardAPI from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import { useAuth } from './contexts/AuthContext';


const ProfileDetailsScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  

  const handleCopy = async (value) => {
    await ClipboardAPI.setStringAsync(value);
    Toast.show({
      type: 'success',
      text1: 'Copied to Clipboard',
      text2: value,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/9919?v=4' }}
          style={styles.avatar}
        />
      </View>

      {/* Profile Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <InfoItem label="Name" value={user?.name || "N/A"} />
        <InfoItem label="Email" value={user?.email || "N/A"} />
      </View>

      {/* Personal Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <InfoItem label="User ID" value={user?._id || "N/A"} copyable onCopy={handleCopy} />
        <InfoItem label="E-mail" value={user?.email || "N/A"} />
        <InfoItem label="Phone Number" value={user?.phoneNO || "N/A"} />
        <InfoItem label="Gender" value={user?.gender || "N/A"} />
        <InfoItem label="Date of Birth" value={user?.dob || "N/A"} />
      </View>
    </ScrollView>
  );
};

const InfoItem = ({ label, value, copyable, onCopy }) => (
  <TouchableOpacity
    style={styles.infoItem}
    onPress={() => copyable && onCopy(value)}
    activeOpacity={copyable ? 0.6 : 1}
  >
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
    {copyable && (
      <Ionicons name="copy-outline" size={20} color="#5a3eff" />
    )}
  </TouchableOpacity>
);

export default ProfileDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginLeft: 10,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 15,
  },
  infoItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#777',
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginTop: 4,
  },
});
