import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('ProfileScreen');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last Updated: June 25, 2025</Text>
          
          <Text style={styles.description}>
            At Baba Hub, your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our services.
          </Text>

          {/* Section 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Information We Collect</Text>
            <Text style={styles.sectionText}>
              We may collect the following types of information:
            </Text>
            
            <Text style={styles.subsectionTitle}>Personal information:</Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Name, email address, phone number, and shipping/billing address.</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Payment information (collected securely through third-party payment processors).</Text>
            </View>

            <Text style={styles.subsectionTitle}>Non-Personal Information:</Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Browser type, device information, and operating system.</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Usage data, such as time spent on our app, pages visited, and clicks.</Text>
            </View>

            <Text style={styles.subsectionTitle}>Cookies and Tracking Technologies:</Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Cookies and similar technologies to enhance user experience and gather analytics.</Text>
            </View>
          </View>

          {/* Section 2 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
            <Text style={styles.sectionText}>
              The information we collect is used to:
            </Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Process and fulfill your orders.</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Provide customer support and respond to inquiries.</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Personalize your shopping experience.</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Send updates, promotions, and relevant notifications.</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Improve our services and troubleshoot issues.</Text>
            </View>
          </View>

          {/* Section 3 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Sharing Your Information</Text>
            <Text style={styles.sectionText}>
              We do not sell or rent your personal information. However, we may share information in the following scenarios:
            </Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>With service providers who assist in our operations (payment processors, shipping companies)</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>When required by law or to protect our legal rights</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>During business transfers like mergers or acquisitions</Text>
            </View>
          </View>

          {/* Section 4 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Data Security</Text>
            <Text style={styles.sectionText}>
              We implement robust security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include:
            </Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Encrypted communications (SSL/TLS)</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Secure servers with firewalls</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Regular security audits and monitoring</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Limited employee access to sensitive data</Text>
            </View>
          </View>

          {/* Section 5 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Your Rights</Text>
            <Text style={styles.sectionText}>
              As a user, you have the right to:
            </Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Access, update, or delete your personal information.</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Opt-out of marketing communications.</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Disable cookies through your browser settings.</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Request a copy of your personal data in a portable format.</Text>
            </View>
          </View>

          {/* Section 6 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Third-Party Links</Text>
            <Text style={styles.sectionText}>
              Our platform may include links to third-party websites. Baba Hub is not responsible for the privacy practices of these external sites, and we encourage you to review their privacy policies.
            </Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Social media platforms integrated with our services</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Payment gateway providers</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Analytics and advertising partners</Text>
            </View>
          </View>

          {/* Section 7 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
            <Text style={styles.sectionText}>
              Baba Hub does not knowingly collect personal information from individuals under the age of 13. If you believe a child has provided us with their information, please contact us immediately at privacy@babahub.co.
            </Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>We comply with COPPA (Children's Online Privacy Protection Act)</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Parental consent required for users under 13</Text>
            </View>
          </View>

          {/* Section 8 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Changes to This Privacy Policy</Text>
            <Text style={styles.sectionText}>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Updates will be posted on our website with the effective date.
            </Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Material changes will be notified via email or app notification</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Continued use after changes constitutes acceptance</Text>
            </View>
          </View>

          {/* Section 9 */}
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>9. Contact Us</Text>
            <Text style={styles.contactText}>
              If you have any questions, concerns, or feedback about this Privacy Policy, please contact us:
            </Text>
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={20} color="#000" />
              <Text style={styles.contactDetail}>Email: privacy@babahub.co</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={20} color="#000" />
              <Text style={styles.contactDetail}>Phone: +1 (800) 123-4567</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="location-outline" size={20} color="#000" />
              <Text style={styles.contactDetail}>Address: 123 Privacy Lane, Data City, DC 12345</Text>
            </View>
            <Text style={styles.contactFooter}>
              We typically respond to inquiries within 2 business days.
            </Text>
          </View>

          {/* Compliance Note */}
          <View style={styles.complianceNote}>
            <Text style={styles.complianceTitle}>Compliance Information</Text>
            <Text style={styles.complianceText}>
              This privacy policy complies with Google Play Console requirements and applicable data protection regulations including GDPR, CCPA, and other regional privacy laws.
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
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: height * 0.03,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  description: {
    fontSize: width * 0.04,
    color: '#333',
    marginBottom: height * 0.04,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: height * 0.03,
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
    marginBottom: height * 0.015,
  },
  sectionText: {
    fontSize: width * 0.038,
    color: '#333',
    marginBottom: height * 0.01,
    lineHeight: 22,
  },
  subsectionTitle: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#000',
    marginTop: height * 0.015,
    marginBottom: height * 0.008,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: height * 0.008,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
    marginRight: width * 0.03,
    marginTop: height * 0.008,
  },
  bulletText: {
    fontSize: width * 0.036,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  contactSection: {
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
    padding: width * 0.04,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  contactTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
    marginBottom: height * 0.015,
  },
  contactText: {
    fontSize: width * 0.038,
    color: '#333',
    marginBottom: height * 0.015,
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.012,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  contactDetail: {
    fontSize: width * 0.038,
    marginLeft: width * 0.03,
    color: '#000',
    fontWeight: '500',
  },
  contactFooter: {
    fontSize: width * 0.035,
    color: '#666',
    marginTop: height * 0.01,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  complianceNote: {
    marginTop: height * 0.03,
    padding: width * 0.04,
    backgroundColor: '#000',
    borderRadius: 12,
  },
  complianceTitle: {
    fontSize: width * 0.04,
    fontWeight: '700',
    color: '#fff',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  complianceText: {
    fontSize: width * 0.035,
    color: '#ddd',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PrivacyPolicyScreen;