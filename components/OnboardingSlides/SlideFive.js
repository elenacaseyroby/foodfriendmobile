import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import ProgressBar from './ProgressBar';
import backgroundImage from './assets/backgroundImage5.png';

class SlideFive extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={5} />
        </View>
        <View style={styles.rectangle}>
          <View style={styles.slideContent}></View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  // Component styles from top of slide
  // to bottom of slide.
  progressBar: {
    marginTop: '12%',
    alignSelf: 'center',
    position: 'absolute',
  },
  // Resusable & component wide styles
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    height: 650,
    width: 375,
    borderColor: '#ffffff',
    borderWidth: 0.5,
  },
});

export default SlideFive;
