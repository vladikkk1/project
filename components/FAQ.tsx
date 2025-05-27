import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

const faqItems = [
  {
    question: 'Які документи потрібні для оформлення кредиту?',
    answer: 'Для оформлення кредиту вам знадобиться лише паспорт громадянина України та індивідуальний податковий номер (ІПН). Жодних додаткових документів не потрібно.',
  },
  {
    question: 'Як швидко я отримаю гроші після схвалення?',
    answer: 'Після схвалення заявки та підписання договору кошти будуть зараховані на вашу банківську карту миттєво. Весь процес від подачі заявки до отримання грошей займає зазвичай не більше 15-20 хвилин.',
  },
  {
    question: 'Які відсоткові ставки на кредити?',
    answer: 'Відсоткова ставка залежить від суми та терміну кредиту. Для кредитів від 50 000 грн на термін від 6 до 18 місяців наша ставка складає від 2.9% на місяць. Точну ставку ви можете розрахувати за допомогою нашого калькулятора.',
  },
  {
    question: 'Чи можна погасити кредит достроково?',
    answer: 'Так, ви можете погасити кредит достроково в будь-який момент без додаткових комісій. При достроковому погашенні ви сплачуєте лише відсотки за фактичний період користування кредитом.',
  },
  {
    question: 'Що буде, якщо я пропущу платіж?',
    answer: 'У разі пропуску планового платежу нараховується додаткова комісія згідно з умовами договору. Ми рекомендуємо своєчасно вносити платежі або заздалегідь повідомляти нас про можливі затримки для уникнення додаткових витрат.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    const toValue = isOpen ? 0 : 1;
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    setIsOpen(!isOpen);
  };

  const bodyHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000], // Large enough value to accommodate any text length
  });

  const iconRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity 
        style={styles.questionContainer} 
        onPress={toggleAccordion}
        activeOpacity={0.7}
      >
        <Text style={styles.question}>{question}</Text>
        <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
          <ChevronDown size={20} color="#0C2055" />
        </Animated.View>
      </TouchableOpacity>
      
      <Animated.View style={[styles.answerContainer, { height: bodyHeight, opacity: animation }]}>
        <Text style={styles.answer}>{answer}</Text>
      </Animated.View>
    </View>
  );
}

export default function FAQ() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Часті запитання</Text>
      
      <View style={styles.faqContainer}>
        {faqItems.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
          />
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
  faqContainer: {
    marginBottom: 24,
  },
  faqItem: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#0C2055',
    flex: 1,
    marginRight: 16,
  },
  answerContainer: {
    overflow: 'hidden',
  },
  answer: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
    padding: 16,
    paddingTop: 0,
  },
});