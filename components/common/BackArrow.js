import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import WhiteBackArrowSVG from '../../assets/images/white-back-arrow.svg';
import BlackBackArrowSVG from '../../assets/images/black-back-arrow.svg';
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
            <WhiteBackArrowSVG style={styles.arrow} />
          ) : (
            <BlackBackArrowSVG style={styles.arrow} />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    marginRight: '5%',
  },
  circle: {
    width: 35,
    height: 35,
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
    // Button Hovers:
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
