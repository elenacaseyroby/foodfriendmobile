import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import ProgressBar from './ProgressBar';
import backgroundImage from './assets/backgroundImage1.png';

class SlideOne extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={1} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  progressBar: {
    marginTop: '12%',
    alignSelf: 'center',
  },
  backgroundImage: {
    height: '100%',
    flex: 1,
  },
});

export default SlideOne;
