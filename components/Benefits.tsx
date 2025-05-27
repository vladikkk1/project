import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle2, Clock, ShieldCheck, CreditCard } from 'lucide-react-native';

const benefits = [
  {
    id: 'speed',
    icon: <Clock size={28} color="#D4AF37" />,
    title: 'Швидке рішення',
    description: 'Рішення за заявкою приймається протягом 15 хвилин',
  },
  {
    id: 'security',
    icon: <ShieldCheck size={28} color="#D4AF37" />,
    title: 'Безпека даних',
    description: 'Ваші дані захищені сучасними технологіями',
  },
  {
    id: 'card',
    icon: <CreditCard size={28} color="#D4AF37" />,
    title: 'На карту',
    description: 'Кошти відразу надходять на вашу банківську карту',
  },
  {
    id: 'requirements',
    icon: <CheckCircle2 size={28} color="#D4AF37" />,
    title: 'Мінімум вимог',
    description: 'Потрібен тільки паспорт та ІПН',
  },
];

export default function Benefits() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Чому вибирають нас</Text>
      
      <View style={styles.benefitsGrid}>
        {benefits.map((benefit) => (
          <View key={benefit.id} style={styles.benefitItem}>
            <View style={styles.iconContainer}>{benefit.icon}</View>
            <View style={styles.textContainer}>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDescription}>{benefit.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 16,
    backgroundColor: '#F7F9FC',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#0C2055',
    marginBottom: 32,
    textAlign: 'center',
  },
  benefitsGrid: {
    flexDirection: 'column',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 28,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(12, 32, 85, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#0C2055',
    marginBottom: 8,
  },
  benefitDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
  },
});