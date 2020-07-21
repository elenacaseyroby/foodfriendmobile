import {Dimensions} from 'react-native';

// Didn't store the height or width multipliers because
// 1. can't use async functions in the stylesheet
// 2. should use get('window') on every render in case phone is tilted
// to side.
export function normalize(value, maxValue = null, basedOnHeight = false) {
  // input value based on iPhone 8.
  // output value to scale on current device.
  // normalizes based on width by default.
  let multiplier;
  if (basedOnHeight) {
    const normalizedHeight = 667;
    const currentHeight = Dimensions.get('window').height;
    multiplier = currentHeight / normalizedHeight;
  } else {
    const currentWidth = Dimensions.get('window').width;
    const normalizedWidth = 375;
    multiplier = currentWidth / normalizedWidth;
  }
  const normalizedValue = value * multiplier;
  if (maxValue) {
    if (normalizedValue > maxValue) return maxValue;
  }
  return normalizedValue;
}
