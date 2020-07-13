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

export default SlideFive;
