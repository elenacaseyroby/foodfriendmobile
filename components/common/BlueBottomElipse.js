import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import elipse from '../../assets/images/bottom-elipse-blue.png';

class BlueBottomElipse extends React.Component {
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
    width: normalize(375),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 80,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default BlueBottomElipse;
