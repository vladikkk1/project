import React, { useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface SliderProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  onValueChange: (value: number) => void;
}

export default function Slider({
  value,
  minimumValue,
  maximumValue,
  step = 1,
  onValueChange,
}: SliderProps) {
  const [sliderWidth, setSliderWidth] = useState(screenWidth - 80); // Default value
  const [thumbPosition] = useState(new Animated.Value(0));

  // Calculate the position of the thumb based on the value
  const calculateThumbPosition = (val: number) => {
    return ((val - minimumValue) / (maximumValue - minimumValue)) * sliderWidth;
  };

  React.useEffect(() => {
    // Update the thumb position when value changes
    thumbPosition.setValue(calculateThumbPosition(value));
  }, [value, sliderWidth]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (_, gestureState) => {
      let newX = gestureState.moveX - 40; // Account for horizontal padding
      
      // Constrain to slider width
      if (newX < 0) newX = 0;
      if (newX > sliderWidth) newX = sliderWidth;
      
      // Calculate the new value based on position
      const ratio = newX / sliderWidth;
      const newValue = minimumValue + ratio * (maximumValue - minimumValue);
      
      // Apply step if provided
      const steppedValue = step 
        ? Math.round(newValue / step) * step 
        : newValue;
      
      // Ensure the value is within bounds
      const constrainedValue = Math.max(
        minimumValue,
        Math.min(maximumValue, steppedValue)
      );
      
      onValueChange(constrainedValue);
    },
    onPanResponderRelease: () => {},
  });

  // Calculate the width of the active track
  const activeTrackWidth = thumbPosition.interpolate({
    inputRange: [0, sliderWidth],
    outputRange: [0, sliderWidth],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setSliderWidth(width);
        thumbPosition.setValue(calculateThumbPosition(value));
      }}
    >
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.activeTrack,
            {
              width: activeTrackWidth,
            },
          ]}
        />
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            transform: [{ translateX: thumbPosition }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
  },
  activeTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D4AF37',
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D4AF37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    transform: [{ translateX: 0 }],
  },
});