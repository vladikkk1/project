import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { Phone } from 'lucide-react-native';
import { Link } from 'expo-router';

export default function Header() {
  const [scrollY] = useState(new Animated.Value(0));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerBackground = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['rgba(12, 32, 85, 0.9)', 'rgba(12, 32, 85, 1)'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.header, { backgroundColor: headerBackground }]}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SGROSHI</Text>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.phoneButton}>
            <Phone size={20} color="#FFFFFF" />
            <Text style={styles.phoneText}>0 800 505 111</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            <View style={[styles.menuLine, isMenuOpen && styles.menuLineRotateDown]}></View>
            <View style={[styles.menuLine, isMenuOpen && styles.menuLineHidden]}></View>
            <View style={[styles.menuLine, isMenuOpen && styles.menuLineRotateUp]}></View>
          </TouchableOpacity>
        </View>
      </View>

      {isMenuOpen && (
        <View style={styles.mobileMenu}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Головна</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/about" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Про нас</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/conditions" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Умови</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/contact" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Контакти</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: Platform.OS === 'ios' ? 40 : 30,
    paddingBottom: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  phoneText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  menuButton: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    transition: 'transform 0.3s ease',
  },
  menuLineRotateDown: {
    transform: [{ rotate: '45deg' }, { translateY: 8 }],
  },
  menuLineHidden: {
    opacity: 0,
  },
  menuLineRotateUp: {
    transform: [{ rotate: '-45deg' }, { translateY: -8 }],
  },
  mobileMenu: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(12, 32, 85, 0.98)',
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});