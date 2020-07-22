import {Dimensions} from 'react-native';

// Didn't store the height or width multipliers because
// 1. can't use async functions in the stylesheet
// 2. should use get('window') on every render in case phone is tilted
// to side.
export function normalize(value, maxValue = null) {
  // input value based on iPhone 8.
  // output value to scale on current device.
  // normalizes based on width, because that's consistent even if the
  // device is flipped.

  const currentWidth = Dimensions.get('window').width;
  const normalizedWidth = 375;
  const multiplier = currentWidth / normalizedWidth;
  const normalizedValue = value * multiplier;
  if (maxValue) {
    if (normalizedValue > maxValue) return maxValue;
  }
  return normalizedValue;
}
