import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { Phone, Text as TextSize, Sun, Moon } from 'lucide-react-native';
import { Link } from 'expo-router';

export default function Header() {
  const [scrollY] = useState(new Animated.Value(0));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [textSizeIndex, setTextSizeIndex] = useState(1); // 0: small, 1: normal, 2: large
  const [isDarkMode, setIsDarkMode] = useState(false);

  const headerBackground = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['rgba(12, 32, 85, 0.9)', 'rgba(12, 32, 85, 1)'],
    extrapolate: 'clamp',
  });

  const textSizes = {
    small: 0.9,
    normal: 1,
    large: 1.2,
  };

  const toggleTextSize = () => {
    setTextSizeIndex((prev) => (prev + 1) % 3);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Animated.View style={[
      styles.header, 
      { backgroundColor: headerBackground },
      isDarkMode && styles.darkHeader
    ]}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={[
            styles.logoText,
            isDarkMode && styles.darkText,
            { fontSize: 24 * textSizes[Object.keys(textSizes)[textSizeIndex]] }
          ]}>SGROSHI</Text>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.accessibilityControls}>
            <TouchableOpacity 
              style={[styles.accessibilityButton, isDarkMode && styles.darkAccessibilityButton]} 
              onPress={toggleTextSize}
            >
              <TextSize size={20} color={isDarkMode ? '#FFFFFF' : '#0C2055'} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.accessibilityButton, isDarkMode && styles.darkAccessibilityButton]} 
              onPress={toggleDarkMode}
            >
              {isDarkMode ? (
                <Sun size={20} color="#FFFFFF" />
              ) : (
                <Moon size={20} color="#0C2055" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.phoneButton}>
            <Phone size={20} color="#FFFFFF" />
            <Text style={[
              styles.phoneText,
              { fontSize: 14 * textSizes[Object.keys(textSizes)[textSizeIndex]] }
            ]}>0 800 505 111</Text>
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
        <View style={[styles.mobileMenu, isDarkMode && styles.darkMobileMenu]}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={[
                styles.menuItemText,
                isDarkMode && styles.darkText,
                { fontSize: 16 * textSizes[Object.keys(textSizes)[textSizeIndex]] }
              ]}>Головна</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/about" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={[
                styles.menuItemText,
                isDarkMode && styles.darkText,
                { fontSize: 16 * textSizes[Object.keys(textSizes)[textSizeIndex]] }
              ]}>Про нас</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/conditions" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={[
                styles.menuItemText,
                isDarkMode && styles.darkText,
                { fontSize: 16 * textSizes[Object.keys(textSizes)[textSizeIndex]] }
              ]}>Умови</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/contact" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={[
                styles.menuItemText,
                isDarkMode && styles.darkText,
                { fontSize: 16 * textSizes[Object.keys(textSizes)[textSizeIndex]] }
              ]}>Контакти</Text>
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
  darkHeader: {
    backgroundColor: '#1a1a1a',
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
  darkText: {
    color: '#FFFFFF',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  accessibilityControls: {
    flexDirection: 'row',
    gap: 8,
  },
  accessibilityButton: {
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkAccessibilityButton: {
    backgroundColor: '#333333',
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
  darkMobileMenu: {
    backgroundColor: 'rgba(26, 26, 26, 0.98)',
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