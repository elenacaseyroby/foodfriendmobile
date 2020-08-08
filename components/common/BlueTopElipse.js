import React from 'react';
import {StyleSheet, Image} from 'react-native';
import elipse from '../../assets/images/top-elipse-blue.png';
import propTypes from 'prop-types';

class BlueBottomElipse extends React.Component {
  static propTypes = {
    style: propTypes.object,
  };
  render() {
    return (
      <>
        <Image source={elipse} style={styles.elipse} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  elipse: {
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 127,
  },
});

export default BlueBottomElipse;
