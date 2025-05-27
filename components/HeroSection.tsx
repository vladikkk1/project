import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HeroSection() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg' }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(12, 32, 85, 0.85)', 'rgba(12, 32, 85, 0.95)']}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>ФІНАНСОВІ РІШЕННЯ</Text>
            <Text style={styles.title}>Кредит на суму від 50 000 грн</Text>
            <Text style={styles.description}>
              Плануйте своє майбутнє з нами. Вигідні умови на тривалий термін від 6 до 18 місяців
            </Text>
            
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Отримати кредит</Text>
              <ArrowRight size={18} color="#0C2055" style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 600,
    marginTop: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  contentContainer: {
    maxWidth: 500,
  },
  subtitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#D4AF37',
    letterSpacing: 1.4,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
    lineHeight: 44,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#0C2055',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});