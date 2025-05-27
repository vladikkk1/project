import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 64;

const testimonials = [
  {
    id: 1,
    name: 'Ольга Петренко',
    age: '62 роки',
    location: 'Київ',
    rating: 5,
    text: 'Дуже зручний сервіс для людей мого віку. Великі кнопки, зрозумілі пояснення. Менеджер все детально пояснив по телефону. Гроші отримала швидко, без зайвої метушні.',
    image: 'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg',
  },
  {
    id: 2,
    name: 'Віктор Коваленко',
    age: '58 років',
    location: 'Львів',
    rating: 5,
    text: 'Вперше брав кредит онлайн, хвилювався. Але все виявилося дуже просто. Особливо сподобалося, що можна збільшити розмір тексту - так набагато зручніше читати умови.',
    image: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg',
  },
  {
    id: 3,
    name: 'Марія Шевченко',
    age: '65 років',
    location: 'Одеса',
    rating: 4,
    text: 'Дуже вдячна за уважне ставлення до клієнтів старшого віку. Онук допоміг оформити перший кредит, а другий я вже сама змогла оформити - все дуже зрозуміло пояснено.',
    image: 'https://images.pexels.com/photos/2050999/pexels-photo-2050999.jpeg',
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
      <Text style={styles.title}>Відгуки наших клієнтів</Text>
      
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
              <View style={styles.testimonialHeader}>
                <Image
                  source={{ uri: testimonial.image }}
                  style={styles.testimonialImage}
                />
                <View style={styles.testimonialInfo}>
                  <Text style={styles.testimonialName}>{testimonial.name}</Text>
                  <Text style={styles.testimonialAge}>{testimonial.age}</Text>
                  <Text style={styles.testimonialLocation}>{testimonial.location}</Text>
                </View>
              </View>
              
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
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  testimonialImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#0C2055',
    marginBottom: 4,
  },
  testimonialAge: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  testimonialLocation: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
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
    fontStyle: 'italic',
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
    width: 48,
    height: 48,
    borderRadius: 24,
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