import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // ✅ IMPORT THIS


const PrivacyPolicyScreen = ({  }) => {
    const navigation = useNavigation(); // ✅ USE THIS

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>At Baba Hub</Text>
        <Text style={styles.description}>
          Your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our services, including our website, mobile application, and other online platforms. By using Baba Hub, you agree to the terms outlined in this policy.
        </Text>

        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.sectionText}>
            We may collect the following types of information:
          </Text>
          
          <Text style={styles.subsectionTitle}>a. Personal information:</Text>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Name, email address, phone number, and shipping/billing address.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Payment information (collected securely through third-party payment processors).</Text>
          </View>

          <Text style={styles.subsectionTitle}>b. Non-Personal Information:</Text>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Browser type, device information, and operating system.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Usage data, such as time spent on our app, pages visited, and clicks.</Text>
          </View>

          <Text style={styles.subsectionTitle}>c. Cookies and Tracking Technologies:</Text>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
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
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Process and fulfill your orders.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Provide customer support and respond to inquiries.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Personalize your shopping experience.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Send updates, promotions, and relevant notifications.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
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
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>With service providers who assist in our operations (payment processors, shipping companies)</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>When required by law or to protect our legal rights</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
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
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Encrypted communications (SSL/TLS)</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Secure servers with firewalls</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Regular security audits and monitoring</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
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
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Access, update, or delete your personal information.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Opt-out of marketing communications.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Disable cookies through your browser settings.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
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
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Social media platforms integrated with our services</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Payment gateway providers</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
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
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>We comply with COPPA (Children's Online Privacy Protection Act)</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
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
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Material changes will be notified via email or app notification</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
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
            <Ionicons name="mail-outline" size={20} color="#264653" />
            <Text style={styles.contactDetail}>Email: privacy@babahub.co</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color="#264653" />
            <Text style={styles.contactDetail}>Phone: +1 (800) 123-4567</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={20} color="#264653" />
            <Text style={styles.contactDetail}>Address: 123 Privacy Lane, Data City, DC 12345</Text>
          </View>
          <Text style={styles.contactFooter}>
            We typically respond to inquiries within 2 business days.
          </Text>
        </View>
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
  sectionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    lineHeight: 22,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#264653',
    marginRight: 8,
  },
  bulletText: {
    fontSize: 15,
    color: '#555',
    flex: 1,
    lineHeight: 22,
  },
  contactSection: {
    marginTop: 30,
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#264653',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 15,
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  contactDetail: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  contactFooter: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default PrivacyPolicyScreen;