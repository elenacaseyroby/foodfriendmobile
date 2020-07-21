import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import foodPlate from '../../assets/images/half-food-plate.png';
import {normalize} from '../../utils/sizeScaling';

class BlueBottomElipse extends React.Component {
  render() {
    return (
      <>
        <Image style={styles.plate} source={foodPlate} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  plate: {
    width: normalize(375),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 311 / 168,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default BlueBottomElipse;
