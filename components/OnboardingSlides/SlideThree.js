import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {normalize, statusBarHeight} from '../../utils/deviceScaling';
import ProgressBar from './ProgressBar';
import backgroundImage from './assets/backgroundImage3.png';

class SlideThree extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={3} />
        </View>
        <View style={styles.rectangle}>
          <View style={styles.topTextContainer}>
            <Text
              style={[styles.whiteText, styles.regularText, styles.textSize]}>
              Just choose a
            </Text>
            <View style={styles.rowContainer}>
              <Text
                style={[styles.whiteText, styles.regularText, styles.textSize]}>
                {'nutrient '}
              </Text>
              <Text
                style={[
                  styles.brownText,
                  styles.italicizedText,
                  styles.textSize,
                ]}>
                path
              </Text>
            </View>
          </View>
          <View style={styles.bottomTextContainer}>
            <Text
              style={[styles.whiteText, styles.regularText, styles.textSize]}>
              aligned with your
            </Text>
            <View style={styles.rowContainer}>
              <Text
                style={[styles.whiteText, styles.regularText, styles.textSize]}>
                {'health '}
              </Text>
              <Text
                style={[
                  styles.orangeText,
                  styles.italicizedText,
                  styles.textSize,
                ]}>
                goals
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  // Component styles from top of slide
  // to bottom of slide.
  progressBar: {
    marginTop: statusBarHeight + 5,
    alignSelf: 'center',
    position: 'absolute',
  },
  topTextContainer: {
    marginTop: statusBarHeight > 30 ? normalize(170) : normalize(120, 150),
    alignItems: 'center',
    width: normalize(202),
  },
  bottomTextContainer: {
    width: normalize(227),
    alignItems: 'center',
    position: 'absolute',
    bottom: '15%',
  },
  whiteText: {
    color: '#ffffff',
  },
  brownText: {
    color: '#9f301b',
  },
  orangeText: {
    color: '#ff8031',
  },
  italicizedText: {
    fontFamily: 'Bellota-BoldItalic',
  },
  regularText: {
    fontFamily: 'Bellota-Regular',
  },
  textSize: {
    fontSize: normalize(32, 70),
    letterSpacing: -1.84,
    lineHeight: normalize(35, 70),
  },
  rowContainer: {
    flexDirection: 'row',
  },
  backgroundImage: {
    height: '100%',
    flex: 1,
  },
  rectangle: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop: 0,
  },
});

export default SlideThree;
