import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Briefcase, GraduationCap, Chrome as Home, PenTool as Tool, ShoppingBag } from 'lucide-react-native';

const purposes = [
  {
    id: 'business',
    title: 'Бізнес',
    icon: <Briefcase size={32} color="#0C2055" />,
    description: 'Розвиток власної справи',
  },
  {
    id: 'education',
    title: 'Навчання',
    icon: <GraduationCap size={32} color="#0C2055" />,
    description: 'Інвестиція в знання',
  },
  {
    id: 'home',
    title: 'Господарство',
    icon: <Home size={32} color="#0C2055" />,
    description: 'Розвиток особистого господарства',
  },
  {
    id: 'renovation',
    title: 'Ремонт',
    icon: <Tool size={32} color="#0C2055" />,
    description: 'Покращення житлових умов',
  },
  {
    id: 'personal',
    title: 'Особисті цілі',
    icon: <ShoppingBag size={32} color="#0C2055" />,
    description: 'Втілення власних планів',
  },
];

export default function LoanPurposes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>На що можна отримати кредит</Text>
      <Text style={styles.subtitle}>
        Виберіть мету кредиту, яка найкраще відповідає вашим потребам
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.purposesContainer}
      >
        {purposes.map((purpose) => (
          <TouchableOpacity key={purpose.id} style={styles.purposeCard}>
            <View style={styles.iconContainer}>{purpose.icon}</View>
            <Text style={styles.purposeTitle}>{purpose.title}</Text>
            <Text style={styles.purposeDescription}>{purpose.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#0C2055',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
    alignSelf: 'center',
  },
  purposesContainer: {
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  purposeCard: {
    width: 170,
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  purposeTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#0C2055',
    marginBottom: 8,
  },
  purposeDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});