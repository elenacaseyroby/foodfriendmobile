import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import propTypes from 'prop-types';

class WideButton extends React.Component {
  static propTypes = {
    title: propTypes.string.isRequired,
    color: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired,
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onClick}
        style={[
          styles.rectangle,
          styles[`background_color_${this.props.color}`],
        ]}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Cabin-Regular',
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
  },
  rectangle: {
    width: 309,
    height: 57,
    paddingTop: 17,
    borderRadius: 28.5,
    // boxShadow: '0 1px 1px 0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  // from props
  background_color_blue: {
    backgroundColor: '#5f7ec6',
  },
});

export default WideButton;
