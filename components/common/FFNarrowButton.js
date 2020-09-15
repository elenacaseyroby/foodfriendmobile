import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class FFNarrowButton extends React.Component {
  static propTypes = {
    onClick: propTypes.func.isRequired,
    label: propTypes.string.isRequired,
    textColor: propTypes.object,
    backgroundColor: propTypes.object,
    style: propTypes.object,
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onClick}
        style={[
          styles.button,
          this.props.backgroundColor || styles.backgroundColor,
          this.props.style,
        ]}>
        <Text style={[styles.text, this.props.textColor || styles.textColor]}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(17),
    textAlign: 'center',
  },
  backgroundColor: {
    backgroundColor: '#719e3d',
  },
  button: {
    width: normalize(120),
    height: normalize(57),
    justifyContent: 'center',
    borderRadius: normalize(28.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textColor: {
    color: '#ffffff',
  },
});

export default FFNarrowButton;
