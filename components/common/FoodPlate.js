import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import foodPlate from '../../assets/images/food-plate.png';

class BlueBottomElipse extends React.Component {
  render() {
    return (
      <View style={styles.plate}>
        <Image source={foodPlate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plate: {
    minWidth: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
  },
});

export default BlueBottomElipse;
