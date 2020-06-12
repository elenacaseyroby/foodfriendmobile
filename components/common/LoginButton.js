import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import propTypes from 'prop-types';

class LoginButton extends React.Component {
  static propTypes = {
    handleLogin: propTypes.func.isRequired,
  };
  render() {
    return (
      <TouchableOpacity onPress={this.props.handleLogin} style={styles.button}>
        <Text style={styles.text}>Sign in</Text>
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
    // boxShadow: '0 1px 1px 0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: '#719e3d',
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default LoginButton;
