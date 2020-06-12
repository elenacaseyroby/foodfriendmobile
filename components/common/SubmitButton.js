import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import propTypes from 'prop-types';

class SubmitButton extends React.Component {
  static propTypes = {
    onClick: propTypes.func.isRequired,
  };
  render() {
    return (
      <TouchableOpacity onPress={this.props.onClick} style={styles.button}>
        <Text style={styles.text}>Submit</Text>
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
  button: {
    width: 309,
    height: 57,
    paddingTop: 17,
    borderRadius: 28.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: '#5f7ec6',
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default SubmitButton;
