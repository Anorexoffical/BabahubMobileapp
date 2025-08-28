import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../contexts/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileInfo}
          onPress={() => navigation.navigate('ProfileDetailsScreen')}
        >
          <Image
            source={{ uri: 'https://avatars.githubusercontent.com/u/9919?v=4' }}
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            {/* <Text style={styles.userName}>ali khan</Text>
            <Text style={styles.userEmail}>hafizalihaider2491@gmail.com</Text> */}
            <Text style={styles.userName}>{user?.name || "Guest"}</Text>
            <Text style={styles.userEmail}>{user?.email || "Not logged in"}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>

        <MenuItem
          icon="cart-outline"
          title="My Cart"
          subtitle="Add, remove products and move to checkout"
          onPress={() => navigation.navigate('CartScreen')}
        />

        <MenuItem
          icon="reorder-three-outline"
          title="My Orders"
          subtitle="In-progress and Completed Orders"
          onPress={() => navigation.navigate('MyOrder')}
        />

        <MenuItem
          icon="headset-outline"
          title="Customer Support"
          subtitle="Contact our support team"
          onPress={() => navigation.navigate('CustomerSupport')}
        />

        <MenuItem
          icon="shield-checkmark-outline"
          title="Privacy Policy"
          subtitle="How we handle your information"
          onPress={() => navigation.navigate('PrivacyPolicyScreen')}
        />
      </View>

      {/* <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          await signOut(); 
          navigation.replace("LoginScreen");
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const MenuItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#264653" />
    <View style={styles.menuText}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#ccc" />
  </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#264653',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  userDetails: { marginLeft: 15 },
  userName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  userEmail: { color: '#eee', fontSize: 14 },
  section: { padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
  },
  menuTitle: { fontSize: 16, fontWeight: '600', color: '#000' },
  menuSubtitle: { fontSize: 13, color: '#777', marginTop: 2 },
  logoutButton: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
});
