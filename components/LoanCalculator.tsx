import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Slider from '@/components/ui/Slider';
import { ArrowRight, Calculator } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(6);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Calculate monthly payment based on amount and term
  useEffect(() => {
    // Simplified loan calculation (in real app, would need more accurate formula)
    const interestRate = 0.029; // 2.9% monthly interest
    const monthlyInterest = interestRate;
    const payments = loanTerm;
    
    const x = Math.pow(1 + monthlyInterest, payments);
    const monthly = (loanAmount * x * monthlyInterest) / (x - 1);
    
    setMonthlyPayment(Math.round(monthly));
    setTotalPayment(Math.round(monthly * payments));

    // Animate the change
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
      </View>

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
          />
          <View style={styles.sliderRange}>
            <Text style={styles.rangeText}>50 000</Text>
            <Text style={styles.rangeText}>500 000</Text>
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
          />
          <View style={styles.sliderRange}>
            <Text style={styles.rangeText}>6 міс</Text>
            <Text style={styles.rangeText}>18 міс</Text>
          </View>
        </View>

        <View style={styles.resultContainer}>
          <Animated.View 
            style={[styles.resultItem, { opacity: fadeAnim }]}
          >
            <Text style={styles.resultLabel}>Щомісячний платіж</Text>
            <Text style={styles.resultValue}>{monthlyPayment.toLocaleString()} грн</Text>
          </Animated.View>
          
          <Animated.View 
            style={[styles.resultItem, { opacity: fadeAnim }]}
          >
            <Text style={styles.resultLabel}>Загальна сума</Text>
            <Text style={styles.resultValue}>{totalPayment.toLocaleString()} грн</Text>
          </Animated.View>
        </View>

        <TouchableOpacity style={styles.button}>
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
    fontSize: 16,
    color: '#0C2055',
  },
  sliderValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#D4AF37',
  },
  sliderRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  rangeText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
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
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  resultValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
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
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});