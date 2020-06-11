import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import WideButton from './common/WideButton';
import Elipse from '../assets/images/top-elipse.svg';
import LogoText from '../assets/images/white-logo-type.svg';
import plateIcon from '../assets/images/plate-icon.png';

class LoginOrSignUp extends React.Component {
  transitionToSignUpPage = () => {
    return;
  };
  transitionToLoginPage = () => {
    return;
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <Elipse style={styles.elipse} />
        <LogoText style={styles.logoText} />
        <Text style={styles.bigText}>{`Start your 
food journey`}</Text>
        <Text style={styles.smallText}>Your guide to healthy eating.</Text>
        <View style={styles.signUpButton}>
          <WideButton
            title="Sign Up"
            color="blue"
            onClick={this.transitionToSignUpPage}
          />
        </View>
        <View style={styles.viewAccountContainer}>
          <Text style={styles.viewAccountText}>Already have an account?</Text>
          <TouchableOpacity onPress={this.transitionToLoginPage}>
            <Text style={styles.loginText}> Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.plateImage}>
          <Image source={plateIcon} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigText: {
    marginLeft: 33,
    marginTop: 60,
    width: 170,
    height: 80,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 30,
    textAlign: 'left',
    color: '#555555',
  },
  smallText: {
    marginLeft: 33,
    width: 191,
    height: 19,
    fontFamily: 'Cabin',
    fontSize: 16,
    color: '#555555',
  },
  signUpButton: {
    marginTop: 70,
    alignSelf: 'center',
  },
  logoText: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 65,
  },
  viewAccountContainer: {
    marginTop: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewAccountText: {
    fontFamily: 'Cabin-SemiBold',
    fontSize: 14,
    color: '#aaaaaa',
  },
  loginText: {
    fontFamily: 'Cabin-SemiBold',
    fontSize: 14,
    color: '#ed762c',
  },
  plateImage: {
    alignSelf: 'center',
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
    flex: 1,
  },
});

export default LoginOrSignUp;
