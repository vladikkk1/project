import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 64;

const testimonials = [
  {
    id: 1,
    name: 'Ольга Петренко',
    location: 'Київ',
    rating: 5,
    text: 'Дуже задоволена сервісом. Швидке оформлення, гроші на карту прийшли через 20 хвилин. Все чітко і без зайвих питань.',
  },
  {
    id: 2,
    name: 'Віктор Коваленко',
    location: 'Львів',
    rating: 5,
    text: 'Вже другий раз користуюсь послугами компанії. Взяв кредит на розвиток бізнесу, умови вигідні, все прозоро.',
  },
  {
    id: 3,
    name: 'Марія Шевченко',
    location: 'Одеса',
    rating: 4,
    text: 'Брала кредит на ремонт квартири. Процес оформлення дуже зручний, менеджери завжди на зв\'язку і допомагають.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / CARD_WIDTH);
    setCurrentIndex(newIndex);
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= testimonials.length) return;
    
    scrollViewRef.current?.scrollTo({
      x: index * CARD_WIDTH,
      animated: true,
    });
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Відгуки клієнтів</Text>
      
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          contentContainerStyle={styles.scrollViewContent}
        >
          {testimonials.map((testimonial) => (
            <View key={testimonial.id} style={styles.testimonialCard}>
              <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    color={i < testimonial.rating ? '#D4AF37' : '#E5E7EB'}
                    fill={i < testimonial.rating ? '#D4AF37' : 'none'}
                  />
                ))}
              </View>
              <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
              <View style={styles.testimonialFooter}>
                <Text style={styles.testimonialName}>{testimonial.name}</Text>
                <Text style={styles.testimonialLocation}>{testimonial.location}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.paginationContainer}>
          {testimonials.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
        
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
            onPress={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            <ChevronLeft
              size={24}
              color={currentIndex === 0 ? '#A1A1AA' : '#0C2055'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentIndex === testimonials.length - 1 && styles.navButtonDisabled,
            ]}
            onPress={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex === testimonials.length - 1}
          >
            <ChevronRight
              size={24}
              color={
                currentIndex === testimonials.length - 1 ? '#A1A1AA' : '#0C2055'
              }
            />
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 32,
    textAlign: 'center',
  },
  carouselContainer: {
    position: 'relative',
  },
  scrollViewContent: {
    paddingHorizontal: 16,
  },
  testimonialCard: {
    width: CARD_WIDTH - 32,
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  testimonialText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  testimonialFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
    paddingTop: 16,
  },
  testimonialName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#0C2055',
    marginBottom: 4,
  },
  testimonialLocation: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#D4AF37',
    width: 24,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  navButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
});