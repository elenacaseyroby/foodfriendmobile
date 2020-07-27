import React from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import {normalize, statusBarHeight} from '../../utils/deviceScaling';
import ProgressBar from './ProgressBar';
import StartButton from './StartButton';
import backgroundImage from './assets/backgroundImage5.png';
import propTypes from 'prop-types';

class SlideFive extends React.Component {
  static propTypes = {
    navigate: propTypes.func.isRequired,
  };
  handleStart = () => {
    this.props.navigate('Onboarding Survey');
  };
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={5} />
        </View>
        <View style={styles.rectangle}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>let's begin your</Text>
            <Text style={[styles.text, styles.italicizedText]}>journey!</Text>
          </View>
          <StartButton style={styles.startButton} onClick={this.handleStart} />
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
  textContainer: {
    marginTop: statusBarHeight + normalize(70),
    alignSelf: 'center',
    alignItems: 'center',
    // marginTop: statusBarHeight + normalize(30),
    width: normalize(195),
    // To test:
    // borderColor: '#ffffff',
    // borderWidth: 0.5,
  },
  italicizedText: {
    fontFamily: 'Bellota-BoldItalic',
  },
  text: {
    fontSize: normalize(28, 50),
    letterSpacing: -1.74,
    lineHeight: normalize(28, 50),
    color: '#ffffff',
    fontFamily: 'Bellota-Regular',
  },
  startButton: {
    position: 'absolute',
    bottom: '7%',
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

export default SlideFive;
