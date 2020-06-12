import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BackArrow from '../assets/images/back-arrow.svg';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import Elipse from '../assets/images/bottom-elipse-blue.svg';
import SubmitButton from './common/SubmitButton';
import AppleLoginButton from './common/AppleLoginButton';
import GoogleLoginButton from './common/GoogleLoginButton';

class PasswordReset extends React.Component {
  transitionToForgotPasswordPage = () => {
    return;
  };
  handleLogin = () => {};
  handleSubmit = () => {};
  render() {
    return (
      <View style={styles.rectangle}>
        <View style={styles.backArrow}>
          <BackArrow />
        </View>
        <View style={styles.welcomeBackContainer}>
          <Text style={styles.welcomeText}>Forgot Password?</Text>
          <Image source={plantMascot} />
        </View>
        <TextInput style={styles.formText} placeholder="Email Address" />
        <View style={styles.formEmailBox} />
        <View style={styles.button}>
          <SubmitButton onClick={this.handleSubmit} />
        </View>
        <View style={styles.button}>
          <AppleLoginButton handleLogin={this.handleLogin} />
        </View>
        <View style={styles.button}>
          <GoogleLoginButton handleLogin={this.handleLogin} />
        </View>
        <Elipse style={styles.elipse} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backArrow: {
    marginTop: 33,
    marginLeft: 33,
  },
  welcomeBackContainer: {
    marginBottom: 15,
    marginTop: 20,
    marginLeft: 33,
    marginRight: 33,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 120,
  },
  welcomeText: {
    marginTop: 25,
    color: '#555555',
    width: 140,
    height: 75,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 30,
  },
  formText: {
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
    width: 310,
    alignSelf: 'center',
  },
  formEmailBox: {
    marginBottom: 35,
    borderBottomWidth: 0.5,
    width: 310,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  elipse: {
    position: 'absolute',
    bottom: 0,
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
    flex: 1,
  },
});

export default PasswordReset;
