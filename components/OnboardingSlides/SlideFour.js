import React from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import {normalize, statusBarHeight} from '../../utils/deviceScaling';
import ProgressBar from './ProgressBar';
import backgroundImage from './assets/backgroundImage4.png';

class SlideFour extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={4} />
        </View>
        <View style={styles.rectangle}>
          <View style={styles.topTextContainer}>
            <Text style={styles.text}>
              Then, use our list of nutrient-rich foods
            </Text>
          </View>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.text}>To help you</Text>
            <Text style={styles.text}>reach your goals</Text>
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
    marginTop: statusBarHeight + normalize(70),
    marginLeft: '10%',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    // marginTop: statusBarHeight + normalize(30),
    width: normalize(195),
    // To test:
    // borderColor: '#ffffff',
    // borderWidth: 0.5,
  },
  bottomTextContainer: {
    marginLeft: '10%',
    width: normalize(210),
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: '15%',
  },
  text: {
    fontSize: normalize(28, 50),
    letterSpacing: -1.74,
    lineHeight: normalize(28, 50),
    color: '#ffffff',
    fontFamily: 'Bellota-Bold',
  },
  backgroundImage: {
    height: '100%',
    flex: 1,
  },
  rectangle: {
    height: '100%',
    alignItems: 'center',
  },
});

export default SlideFour;
