import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CustomerSupportScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('ProfileScreen');
    }
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@babahub.co');
  };

  const handleCallPress = () => {
    Linking.openURL('tel:+18001234567');
  };

  const handleFAQPress = () => {
    // Navigate to FAQ screen or open FAQ modal
    alert('FAQ section would open here');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="headset-outline" size={40} color="#000" />
            </View>
            <Text style={styles.title}>We're Here for You!</Text>
            <Text style={styles.description}>
              At Baba Hub, we value our customers and strive to provide exceptional support to ensure your experience with us is seamless and enjoyable.
            </Text>
          </View>

          {/* Contact Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            
            {/* Email Support */}
            <TouchableOpacity style={styles.contactCard} onPress={handleEmailPress}>
              <View style={styles.contactIcon}>
                <Ionicons name="mail-outline" size={24} color="#000" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactMethod}>Email Support</Text>
                <Text style={styles.contactDetail}>support@babahub.co</Text>
                <Text style={styles.responseTime}>Response time: Within 24 hours</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            {/* Phone Support */}
            <TouchableOpacity style={styles.contactCard} onPress={handleCallPress}>
              <View style={styles.contactIcon}>
                <Ionicons name="call-outline" size={24} color="#000" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactMethod}>Phone Support</Text>
                <Text style={styles.contactDetail}>+1 (800) 123-4567</Text>
                <Text style={styles.responseTime}>Mon-Fri: 9AM-6PM (EST)</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            {/* FAQ */}
            <TouchableOpacity style={styles.contactCard} onPress={handleFAQPress}>
              <View style={styles.contactIcon}>
                <Ionicons name="help-circle-outline" size={24} color="#000" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactMethod}>FAQ & Help Center</Text>
                <Text style={styles.contactDetail}>Quick answers to common questions</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Services Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How We Can Help</Text>
            
            <View style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Ionicons name="checkmark-circle" size={20} color="#000" />
              </View>
              <Text style={styles.serviceText}>Assistance with orders, returns, and refunds</Text>
            </View>
            
            <View style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Ionicons name="checkmark-circle" size={20} color="#000" />
              </View>
              <Text style={styles.serviceText}>Account-related queries and troubleshooting</Text>
            </View>
            
            <View style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Ionicons name="checkmark-circle" size={20} color="#000" />
              </View>
              <Text style={styles.serviceText}>Product information and recommendations</Text>
            </View>
            
            <View style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Ionicons name="checkmark-circle" size={20} color="#000" />
              </View>
              <Text style={styles.serviceText}>Technical support and bug reports</Text>
            </View>
            
            <View style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Ionicons name="checkmark-circle" size={20} color="#000" />
              </View>
              <Text style={styles.serviceText}>Feedback, suggestions, or complaints</Text>
            </View>
          </View>

          {/* Business Hours */}
          <View style={styles.hoursSection}>
            <Text style={styles.sectionTitle}>Support Hours</Text>
            <View style={styles.hoursContainer}>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Monday - Friday</Text>
                <Text style={styles.hoursTime}>9:00 AM - 6:00 PM EST</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Saturday</Text>
                <Text style={styles.hoursTime}>10:00 AM - 4:00 PM EST</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Sunday</Text>
                <Text style={styles.hoursTime}>Emergency Support Only</Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Thank you for choosing Baba Hub. We're committed to making your experience delightful every step of the way.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerSpacer: {
    width: 24,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: height * 0.05,
  },
  content: {
    padding: width * 0.05,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: height * 0.04,
    padding: width * 0.04,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
    borderWidth: 2,
    borderColor: '#000',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  description: {
    fontSize: width * 0.04,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: height * 0.04,
    padding: width * 0.04,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
    marginBottom: height * 0.02,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 8,
    marginBottom: height * 0.015,
    borderWidth: 1,
    borderColor: '#eee',
  },
  contactIcon: {
    marginRight: width * 0.04,
  },
  contactInfo: {
    flex: 1,
  },
  contactMethod: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  contactDetail: {
    fontSize: width * 0.038,
    color: '#333',
    marginBottom: 2,
  },
  responseTime: {
    fontSize: width * 0.032,
    color: '#666',
    fontStyle: 'italic',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.012,
    paddingVertical: height * 0.008,
  },
  serviceIcon: {
    marginRight: width * 0.03,
  },
  serviceText: {
    fontSize: width * 0.038,
    color: '#333',
    flex: 1,
  },
  hoursSection: {
    marginBottom: height * 0.04,
    padding: width * 0.04,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  hoursContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: width * 0.04,
    borderWidth: 1,
    borderColor: '#eee',
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  hoursDay: {
    fontSize: width * 0.038,
    color: '#333',
    fontWeight: '500',
  },
  hoursTime: {
    fontSize: width * 0.038,
    color: '#000',
    fontWeight: '600',
  },
  footer: {
    marginTop: height * 0.02,
    padding: width * 0.04,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  footerText: {
    fontSize: width * 0.038,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
});

export default CustomerSupportScreen;