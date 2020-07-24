import {Dimensions, Platform, StatusBar} from 'react-native';

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

// Status bar functions;
export const isIPhoneX = () => {
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  const XSMAX_WIDTH = 414;
  const XSMAX_HEIGHT = 896;
  const {width, height} = Dimensions.get('window');
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
        (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;
};

export const getIosStatusBarHeight = () => {
  if (Platform.OS !== 'ios') return 0;
  if (Platform.isPad) return 24;
  if (isIPhoneX()) return 44;
  return 20;
};

export const statusBarHeight = Platform.select({
  ios: getIosStatusBarHeight(),
  android: StatusBar.currentHeight,
  default: 0,
});
