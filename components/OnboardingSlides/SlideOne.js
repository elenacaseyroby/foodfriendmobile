import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import {normalize, statusBarHeight} from '../../utils/deviceScaling';
import ProgressBar from './ProgressBar';
import backgroundImage from './assets/backgroundImage1.png';
import rightArrow from './assets/right-arrow.png';

class SlideOne extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={1} />
        </View>
        <View style={styles.rectangle}>
          <View style={styles.topTextContainer}>
            <Text style={[styles.blueText, styles.boldText, styles.h1]}>
              everyone
            </Text>
            <Text style={[styles.whiteText, styles.regularText, styles.h1]}>
              {'deserves to'}
            </Text>
            <View style={styles.rowContainer}>
              <Text style={[styles.whiteText, styles.regularText, styles.h1]}>
                {' feel '}
              </Text>
              <Text
                style={[styles.whiteText, styles.italicizedText, styles.h1]}>
                good
              </Text>
            </View>
          </View>
          <View style={styles.bottomTextContainer}>
            <View style={styles.rowContainer}>
              <Text style={[styles.blueText, styles.regularText, styles.h2]}>
                {'but this can be '}
              </Text>
              <Text
                style={[styles.whiteText, styles.italicizedText, styles.h2]}>
                {'difficult'}
              </Text>
            </View>
            <Text style={[styles.blueText, styles.regularText, styles.h2]}>
              {'when relying on expensive, '}
            </Text>
            <View style={styles.rowContainer}>
              <Text style={[styles.blueText, styles.regularText, styles.h2]}>
                {'unregulated '}
              </Text>
              <Text style={[styles.whiteText, styles.boldText, styles.h2]}>
                {'supplements'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.swipeContainer}>
          <Text style={styles.swipeText}>Swipe to continue</Text>
          <Image style={styles.arrow} source={rightArrow} />
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
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: statusBarHeight + normalize(30),
    width: normalize(221),
    // To test:
    // borderColor: '#ffffff',
    // borderWidth: 0.5,
  },
  bottomTextContainer: {
    width: normalize(295),
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '12%',
  },
  swipeContainer: {
    position: 'absolute',
    bottom: '3%',
    marginRight: '3%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: normalize(105),
    // borderColor: '#ffffff',
    // borderWidth: 0.5,
  },
  swipeText: {
    fontSize: normalize(12),
    fontFamily: 'Bellota-Regular',
    color: '#917245',
  },
  arrow: {
    width: normalize(6),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 18 / 33,
    marginLeft: '1%',
    marginTop: '1.9%',
  },
  blueText: {
    color: '#5d80c1',
  },
  whiteText: {
    color: '#ffffff',
  },
  boldText: {
    fontFamily: 'Bellota-Bold',
  },
  italicizedText: {
    fontFamily: 'Bellota-BoldItalic',
  },
  regularText: {
    fontFamily: 'Bellota-Regular',
  },
  h1: {
    fontSize: normalize(48, 80),
    letterSpacing: -3.4,
    lineHeight: normalize(49, 80),
  },
  h2: {
    fontSize: normalize(30, 60),
    letterSpacing: -2.82,
    lineHeight: normalize(37, 60),
  },
  rowContainer: {
    flexDirection: 'row',
  },
  backgroundImage: {
    height: '100%',
    flex: 1,
  },
  // Use this to fit slide on iPhone 8
  // and center slide on iPhone 11
  rectangle: {
    height: '100%',
    alignItems: 'center',
  },
});

export default SlideOne;
