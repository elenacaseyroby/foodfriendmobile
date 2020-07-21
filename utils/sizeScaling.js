import {Dimensions} from 'react-native';

// Didn't store the height or width multipliers because
// 1. can't use async functions in the stylesheet
// 2. should use get('window') on every render in case phone is tilted
// to side.
export function normalize(value, basedOnHeight = false) {
  // input value based on iPhone 8.
  // output value to scale on current device.
  if (basedOnHeight) {
    const normalizedHeight = 667;
    const currentHeight = Dimensions.get('window').height;
    const heightMultiplier = currentHeight / normalizedHeight;
    return value * heightMultiplier;
  }
  const currentWidth = Dimensions.get('window').width;
  const normalizedWidth = 375;
  const widthMultiplier = currentWidth / normalizedWidth;
  return value * widthMultiplier;
}
