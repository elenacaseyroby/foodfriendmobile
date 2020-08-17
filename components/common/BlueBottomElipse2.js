import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import elipse from '../../assets/images/bottom-elipse-blue-2.png';
import propTypes from 'prop-types';

class BlueBottomElipse2 extends React.Component {
  static propTypes = {
    style: propTypes.object,
    elipseStyle: propTypes.object,
  };
  render() {
    return (
      <View style={this.props.style}>
        <Image
          source={elipse}
          style={[styles.elipse, this.props.elipseStyle || styles.positon]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  elipse: {
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 164,
    alignItems: 'center',
  },
});

export default BlueBottomElipse2;
