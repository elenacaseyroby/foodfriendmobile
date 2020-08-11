import React from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/deviceScaling';
import arrow from '../../../assets/images/black-forward-arrow.png';
import propTypes from 'prop-types';

class ArrowButton extends React.Component {
  static propTypes = {
    onPress: propTypes.func.isRequired,
    style: propTypes.object,
  };
  render() {
    return (
      <TouchableOpacity
        style={(styles.container, this.props.style)}
        onPress={this.props.onPress}>
        <View style={[styles.circle]}>
          <Image source={arrow} style={styles.arrow} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    marginLeft: normalize(2),
    width: normalize(8),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 8 / 13,
  },
  circle: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // Button effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
  },
  container: {
    // Button Hovers over other components:
    // marginLeft: 33,
    // marginTop: '10.5%',
    // position: 'absolute',
  },
});

export default ArrowButton;
