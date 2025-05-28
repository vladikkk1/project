import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Slider from '@/components/ui/Slider';
import { ArrowRight, Calculator, HelpCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(6);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const interestRate = 0.029;
    const monthlyInterest = interestRate;
    const payments = loanTerm;
    
    const x = Math.pow(1 + monthlyInterest, payments);
    const monthly = (loanAmount * x * monthlyInterest) / (x - 1);
    
    setMonthlyPayment(Math.round(monthly));
    setTotalPayment(Math.round(monthly * payments));

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [loanAmount, loanTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Calculator size={24} color="#0C2055" />
        <Text style={styles.title}>Розрахуйте свій кредит</Text>
        <TouchableOpacity 
          onPress={() => setShowHelp(!showHelp)}
          style={styles.helpButton}
          accessibilityLabel="Довідка про калькулятор"
          accessibilityHint="Натисніть, щоб отримати додаткову інформацію про розрахунок кредиту"
        >
          <HelpCircle size={20} color="#0C2055" />
        </TouchableOpacity>
      </View>

      {showHelp && (
        <View style={styles.helpBox}>
          <Text style={styles.helpText}>
            Цей калькулятор допоможе вам розрахувати суму щомісячного платежу та загальну суму до сплати.
            {'\n\n'}
            1. Виберіть суму кредиту
            {'\n'}
            2. Виберіть термін кредиту
            {'\n'}
            3. Перегляньте розрахунок платежів
          </Text>
        </View>
      )}

      <View style={styles.calculatorContainer}>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>Сума кредиту</Text>
            <Text style={styles.sliderValue}>{loanAmount.toLocaleString()} грн</Text>
          </View>
          <Slider
            value={loanAmount}
            minimumValue={50000}
            maximumValue={500000}
            step={1000}
            onValueChange={setLoanAmount}
            accessibilityLabel={`Сума кредиту: ${loanAmount.toLocaleString()} гривень`}
            accessibilityHint="Проведіть пальцем вліво або вправо, щоб змінити суму кредиту"
          />
          <View style={styles.sliderRange}>
            <Text style={styles.rangeText}>50 000 грн</Text>
            <Text style={styles.rangeText}>500 000 грн</Text>
          </View>
        </View>

        <View style={styles.sliderContainer}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>Термін кредиту</Text>
            <Text style={styles.sliderValue}>{loanTerm} місяців</Text>
          </View>
          <Slider
            value={loanTerm}
            minimumValue={6}
            maximumValue={18}
            step={1}
            onValueChange={setLoanTerm}
            accessibilityLabel={`Термін кредиту: ${loanTerm} місяців`}
            accessibilityHint="Проведіть пальцем вліво або вправо, щоб змінити термін кредиту"
          />
          <View style={styles.sliderRange}>
            <Text style={styles.rangeText}>6 міс</Text>
            <Text style={styles.rangeText}>18 міс</Text>
          </View>
        </View>

        <View style={styles.resultContainer}>
          <Animated.View 
            style={[styles.resultItem, { opacity: fadeAnim }]}
            accessibilityLabel={`Щомісячний платіж: ${monthlyPayment.toLocaleString()} гривень`}
          >
            <Text style={styles.resultLabel}>Щомісячний платіж</Text>
            <Text style={styles.resultValue}>{monthlyPayment.toLocaleString()} грн</Text>
          </Animated.View>
          
          <Animated.View 
            style={[styles.resultItem, { opacity: fadeAnim }]}
            accessibilityLabel={`Загальна сума: ${totalPayment.toLocaleString()} гривень`}
          >
            <Text style={styles.resultLabel}>Загальна сума</Text>
            <Text style={styles.resultValue}>{totalPayment.toLocaleString()} грн</Text>
          </Animated.View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          accessibilityLabel="Оформити кредит"
          accessibilityHint="Натисніть, щоб перейти до оформлення кредиту"
        >
          <Text style={styles.buttonText}>Оформити кредит</Text>
          <ArrowRight size={18} color="#FFFFFF" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 40,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#0C2055',
    marginLeft: 12,
    flex: 1,
  },
  helpButton: {
    padding: 8,
  },
  helpBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  helpText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  calculatorContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#0C2055',
  },
  sliderValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#D4AF37',
  },
  sliderRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  rangeText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingTop: 8,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  resultItem: {
    alignItems: 'center',
    minWidth: '45%',
  },
  resultLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  resultValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#0C2055',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C2055',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});