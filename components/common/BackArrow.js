import React from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/sizeScaling';
import whiteBackArrow from '../../assets/images/white-back-arrow.png';
import blackBackArrow from '../../assets/images/black-back-arrow.png';
import propTypes from 'prop-types';

class BackArrow extends React.Component {
  static propTypes = {
    onPress: propTypes.func.isRequired,
    // takes : 'blue', 'green', 'white'
    backgroundColor: propTypes.string,
  };
  render() {
    const possibleColors = ['blue', 'white', 'green'];
    // Set background color if the value is in the possibleColors array.
    // Default is white.
    const backgroundColor =
      this.props.backgroundColor &&
      possibleColors.includes(this.props.backgroundColor)
        ? this.props.backgroundColor
        : 'white';
    // If background is white, we want the arrow to be black.
    // otherwise arrow is white.
    const arrowColor = backgroundColor === 'white' ? 'black' : 'white';
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={[styles.circle, styles[`${backgroundColor}Background`]]}>
          {arrowColor === 'white' ? (
            <Image source={whiteBackArrow} style={styles.arrow} />
          ) : (
            <Image source={blackBackArrow} style={styles.arrow} />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    marginRight: '5%',
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
    flex: 1,
  },
  // Dynamic background colors
  blueBackground: {
    backgroundColor: '#5f7ec6',
  },
  whiteBackground: {
    backgroundColor: '#FFFFFF',
  },
  greenBackground: {
    backgroundColor: '#719e3d',
  },
});

export default BackArrow;
