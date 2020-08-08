import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import elipse from '../../assets/images/bottom-elipse-blue.png';
import propTypes from 'prop-types';

class BlueBottomElipse extends React.Component {
  static propTypes = {
    style: propTypes.object,
  };
  render() {
    return (
      <>
        <Image
          source={elipse}
          style={[styles.elipse, this.props.style || styles.positon]}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  positon: {
    position: 'absolute',
    bottom: 0,
  },
  elipse: {
    width: normalize(375),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 80,
    alignItems: 'center',
  },
});

export default BlueBottomElipse;
