import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react-native';
import { Link } from 'expo-router';

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>SGROSHI</Text>
          <Text style={styles.tagline}>
            Фінансові рішення для ваших потреб
          </Text>
        </View>

        <View style={styles.contactSection}>
          <View style={styles.contactItem}>
            <Phone size={18} color="#D4AF37" />
            <Text style={styles.contactText}>0 800 505 111</Text>
          </View>
          <View style={styles.contactItem}>
            <Mail size={18} color="#D4AF37" />
            <Text style={styles.contactText}>info@sgroshi.ua</Text>
          </View>
          <View style={styles.contactItem}>
            <MapPin size={18} color="#D4AF37" />
            <Text style={styles.contactText}>Київ, вул. Хрещатик, 22</Text>
          </View>
        </View>

        <View style={styles.linksSection}>
          <Text style={styles.linksTitle}>Корисні посилання</Text>
          <Link href="/about" asChild>
            <TouchableOpacity style={styles.linkItem}>
              <Text style={styles.linkText}>Про компанію</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/conditions" asChild>
            <TouchableOpacity style={styles.linkItem}>
              <Text style={styles.linkText}>Умови</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/faq" asChild>
            <TouchableOpacity style={styles.linkItem}>
              <Text style={styles.linkText}>Питання та відповіді</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/contact" asChild>
            <TouchableOpacity style={styles.linkItem}>
              <Text style={styles.linkText}>Контакти</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Ми в соцмережах</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}>
              <Facebook size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Instagram size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Linkedin size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.copyrightText}>
          © 2025 SGROSHI. Всі права захищені.
        </Text>
        <View style={styles.legalLinks}>
          <Link href="/privacy" asChild>
            <TouchableOpacity>
              <Text style={styles.legalLinkText}>Політика конфіденційності</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.legalLinkSeparator}>|</Text>
          <Link href="/terms" asChild>
            <TouchableOpacity>
              <Text style={styles.legalLinkText}>Умови використання</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0C2055',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  topSection: {
    marginBottom: 40,
  },
  logoSection: {
    marginBottom: 32,
  },
  logoText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  contactSection: {
    marginBottom: 32,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  linksSection: {
    marginBottom: 32,
  },
  linksTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  linkItem: {
    marginBottom: 12,
  },
  linkText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  socialSection: {
    marginBottom: 32,
  },
  socialTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bottomSection: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  copyrightText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 8,
  },
  legalLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legalLinkText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  legalLinkSeparator: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: 8,
  },
});