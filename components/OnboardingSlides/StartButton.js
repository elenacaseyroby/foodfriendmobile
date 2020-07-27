import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class StartButton extends React.Component {
  static propTypes = {
    onClick: propTypes.func.isRequired,
    style: propTypes.object,
  };
  render() {
    console.log('normal');
    console.log(normalize(100 / 2));
    return (
      <TouchableOpacity
        onPress={this.props.onClick}
        style={[styles.circle, this.props.style ? this.props.style : {}]}>
        <Text style={styles.text}>Start</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: normalize(4),
    marginRight: normalize(2),
    fontSize: normalize(25, 40),
    letterSpacing: -1.74,
    lineHeight: normalize(25, 40),
    color: '#ffffff',
    fontFamily: 'Bellota-Regular',
    textAlign: 'center',
  },
  circle: {
    borderColor: '#596484',
    borderWidth: normalize(2, 3),
    backgroundColor: '#233562',
    width: normalize(100, 150),
    height: normalize(100, 150),
    borderRadius: normalize(100 / 2, 75),
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
});

export default StartButton;
