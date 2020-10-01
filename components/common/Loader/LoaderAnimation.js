import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animation from 'lottie-react-native';
import loadingDots from './assets/basic-blue-loader.json';
import {normalize} from '../../../utils/deviceScaling';

export default class LoaderAnimation extends React.Component {
  componentDidMount = () => {
    // currently the animation will play for as long as this component is mounted.
    this.animation.play();
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <View style={styles.container}>
          <Animation
            ref={(animation) => {
              this.animation = animation;
            }}
            style={styles.lottie}
            loop={true}
            source={loadingDots}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rectangle: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: normalize(30),
    height: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});
