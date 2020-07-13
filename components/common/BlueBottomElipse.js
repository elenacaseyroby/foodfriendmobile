import React from 'react';
import {StyleSheet} from 'react-native';
import Elipse from '../../assets/images/bottom-elipse-blue.svg';

class BlueBottomElipse extends React.Component {
  render() {
    return (
      <>
        <Elipse style={styles.elipse} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  elipse: {
    position: 'absolute',
    bottom: 0,
  },
});

export default BlueBottomElipse;
