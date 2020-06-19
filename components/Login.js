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
import plantMascot from '../assets/images/plant-mascot.png';
import Elipse from '../assets/images/bottom-elipse-green.svg';
import LoginButton from './common/LoginButton';
// import AppleLoginButton from './common/AppleLoginButton';
// import GoogleLoginButton from './common/GoogleLoginButton';
import auth from '../services/auth';
import asyncStorage from '../services/asyncStorage';

class Login extends React.Component {
  state = {
    email: null,
    password: null,
  };
  transitionToForgotPasswordPage = () => {
    return;
  };
  handleEmail = (email) => {
    this.setState({email: email});
  };
  handlePassword = (password) => {
    this.setState({password: password});
  };
  handleLogin = async () => {
    const loginToken = await auth.login(this.state.email, this.state.password);
    if (loginToken.status !== '200') {
      // CASEY TODO:
      //print error on page
      console.log(loginToken.response);
    }
    asyncStorage._storeData('ACCESS_TOKEN', loginToken.response.access_token);
    asyncStorage._storeData('USER_ID', loginToken.response.id);
    // if token, set login & redirect to home page
    console.log(loginToken);
  };
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
        <TextInput
          style={styles.formText}
          placeholder="Email Address"
          onChangeText={this.handleEmail}
        />
        <View style={styles.formEmailBox} />
        <TextInput
          style={styles.formText}
          secureTextEntry={true}
          placeholder="Password (8+ characters)"
          onChangeText={this.handlePassword}
        />
        <View style={styles.formPasswordBox} />
        <TouchableOpacity onPress={this.transitionToForgotPasswordPage}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.loginButton}>
          <LoginButton handleLogin={this.handleLogin} />
        </View>
        {/* <View style={styles.loginButton}>
          <AppleLoginButton handleLogin={this.handleLogin} />
        </View>
        <View style={styles.loginButton}>
          <GoogleLoginButton handleLogin={this.handleLogin} />
        </View> */}
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
  formPasswordBox: {
    borderBottomWidth: 0.5,
    width: 310,
    alignSelf: 'center',
  },
  forgotPasswordText: {
    marginTop: 15,
    marginLeft: 33,
    marginBottom: 25,
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#ed762c',
  },
  loginButton: {
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

export default Login;
