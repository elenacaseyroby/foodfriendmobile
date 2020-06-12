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
import LoginButton from './common/LoginButton';
import AppleLoginButton from './common/AppleLoginButton';
import GoogleLoginButton from './common/GoogleLoginButton';

class Login extends React.Component {
  transitionToForgotPasswordPage = () => {
    return;
  };
  transitionToTermsNConditions = () => {
    return;
  };
  transitionToPrivacyPolicy = () => {
    return;
  };
  handleLogin = () => {};
  render() {
    return (
      <View style={styles.rectangle}>
        <View style={styles.backArrow}>
          <BackArrow />
        </View>
        <View style={styles.welcomeBackContainer}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Image source={plantMascot} />
        </View>
        <TextInput style={styles.formText} placeholder="First Name" />
        <View style={styles.formTextBox} />
        <TextInput style={styles.formText} placeholder="Last Name" />
        <View style={styles.formTextBox} />
        <TextInput style={styles.formText} placeholder="Email" />
        <View style={styles.formTextBox} />
        <TextInput
          style={styles.formText}
          secureTextEntry={true}
          placeholder="Password (8+ characters)"
        />
        <View style={styles.formPasswordBox} />
        <View style={styles.termsContainer}>
          <Text>By continuing, you agree to FoodFriend’s</Text>
          <TouchableOpacity onPress={this.transitionToTermsNConditions}>
            <Text style={styles.termsTextOrange}>terms & conditions</Text>
          </TouchableOpacity>
          <Text>{` and `}</Text>
          <TouchableOpacity onPress={this.transitionToPrivacyPolicy}>
            <Text style={styles.termsTextOrange}>privacy policy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginButton}>
          <LoginButton handleLogin={this.handleLogin} />
        </View>
        <View style={styles.loginButton}>
          <AppleLoginButton handleLogin={this.handleLogin} />
        </View>
        <View style={styles.loginButton}>
          <GoogleLoginButton handleLogin={this.handleLogin} />
        </View>
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
    marginTop: 10,
    marginLeft: 33,
    marginRight: 33,
    maxHeight: 150,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 12,
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
    width: 310,
    alignSelf: 'center',
  },
  formTextBox: {
    marginBottom: 25,
    borderBottomWidth: 0.5,
    width: 310,
    alignSelf: 'center',
  },
  formPasswordBox: {
    borderBottomWidth: 0.5,
    width: 310,
    alignSelf: 'center',
  },
  termsContainer: {
    marginTop: 20,
    marginLeft: 33,
    marginRight: 33,
    marginBottom: 30,
    maxHeight: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
  },
  termsTextOrange: {
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#ed762c',
  },
  loginButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
    flex: 1,
  },
});

export default Login;
