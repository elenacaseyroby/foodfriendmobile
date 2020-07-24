import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class SignInButton extends React.Component {
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
    fontSize: normalize(17),
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    width: normalize(310),
    height: normalize(57),
    borderRadius: normalize(28.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: normalize(1),
    },
    backgroundColor: '#719e3d',
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
  },
});

export default SignInButton;
