import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import propTypes from 'prop-types';
import AppleLogo from '../../assets/images/apple-logo.svg';

class AppleLoginButton extends React.Component {
  static propTypes = {
    handleLogin: propTypes.func.isRequired,
  };
  render() {
    return (
      <TouchableOpacity onPress={this.props.handleLogin} style={styles.button}>
        <View style={styles.buttonContentContainer}>
          <AppleLogo />
          <Text style={styles.text}>Sign in with Apple</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonContentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    marginTop: 3,
    marginLeft: 7,
    fontFamily: 'Cabin-Regular',
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default AppleLoginButton;
