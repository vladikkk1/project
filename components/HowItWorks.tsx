import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const steps = [
  {
    number: '01',
    title: 'Заповніть заявку',
    description: 'Вкажіть необхідну суму та строк кредиту',
  },
  {
    number: '02',
    title: 'Отримайте рішення',
    description: 'Ми розглянемо вашу заявку за 15 хвилин',
  },
  {
    number: '03',
    title: 'Підпишіть договір',
    description: 'Електронний підпис через SMS-код',
  },
  {
    number: '04',
    title: 'Отримайте гроші',
    description: 'Миттєве зарахування коштів на вашу карту',
  },
];

export default function HowItWorks() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Як отримати кредит</Text>
      <Text style={styles.subtitle}>
        Чотири простих кроки для отримання коштів
      </Text>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>{step.number}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
            {index < steps.length - 1 && <View style={styles.connector} />}
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
    backgroundColor: '#0C2055',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 40,
    textAlign: 'center',
  },
  stepsContainer: {
    marginTop: 16,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 32,
    position: 'relative',
  },
  stepNumberContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    zIndex: 2,
  },
  stepNumber: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#0C2055',
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 21,
  },
  connector: {
    position: 'absolute',
    left: 24,
    top: 48,
    width: 2,
    height: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.5)',
    zIndex: 1,
  },
});