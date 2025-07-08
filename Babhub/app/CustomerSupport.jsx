import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // ✅ IMPORT THIS



const CustomerSupportScreen = ({  }) => {
      const navigation = useNavigation(); // ✅ USE THIS
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>We're Here for You!</Text>
        <Text style={styles.description}>
          At Baba Hub, we value our customers and strive to provide exceptional support to ensure your experience with us is seamless and enjoyable.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Reach Us:</Text>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color="#264653" />
            <Text style={styles.contactText}>Email Support: support@babahub.co</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our email support can help with:</Text>
          <View style={styles.bulletItem}>
            <Ionicons name="checkmark-circle" size={16} color="#264653" />
            <Text style={styles.bulletText}>Assistance with orders, returns, and refunds</Text>
          </View>
          <View style={styles.bulletItem}>
            <Ionicons name="checkmark-circle" size={16} color="#264653" />
            <Text style={styles.bulletText}>Account-related queries and troubleshooting</Text>
          </View>
          <View style={styles.bulletItem}>
            <Ionicons name="checkmark-circle" size={16} color="#264653" />
            <Text style={styles.bulletText}>Information about our products and services</Text>
          </View>
          <View style={styles.bulletItem}>
            <Ionicons name="checkmark-circle" size={16} color="#264653" />
            <Text style={styles.bulletText}>Feedback, suggestions, or complaints</Text>
          </View>
        </View>

        <Text style={styles.footerText}>
          Thank you for choosing Baba Hub. We're committed to making your experience delightful every step of the way.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#264653',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    lineHeight: 24,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#264653',
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletText: {
    fontSize: 15,
    marginLeft: 8,
    color: '#555',
    flex: 1,
  },
  footerText: {
    fontSize: 15,
    color: '#555',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default CustomerSupportScreen;