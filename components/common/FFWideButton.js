import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class FFWideButton extends React.Component {
  static propTypes = {
    onClick: propTypes.func.isRequired,
    label: propTypes.string.isRequired,
    backgroundColorStyle: propTypes.object,
    textStyle: propTypes.object,
    style: propTypes.object,
  };
  render() {
    console.log(this.props.textStyle);
    return (
      <TouchableOpacity
        onPress={this.props.onClick}
        style={[
          styles.button,
          this.props.backgroundColorStyle
            ? this.props.backgroundColorStyle
            : styles.defaultBackgroundColor,
        ]}>
        <Text
          style={[
            styles.text,
            this.props.textStyle ? this.props.textStyle : styles.defaultText,
          ]}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Cabin-Regular',
    color: '#ffffff',
    fontSize: normalize(17),
  },
  text: {
    textAlign: 'center',
  },
  button: {
    width: normalize(310),
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
  defaultBackgroundColor: {
    backgroundColor: '#5f7ec6',
  },
});

export default FFWideButton;
