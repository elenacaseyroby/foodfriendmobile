import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import propTypes from 'prop-types';
import plantMascot from '../assets/images/plant-mascot.png';
import Elipse from '../assets/images/bottom-elipse-green.svg';
import LoginButton from './common/LoginButton';
import auth from '../services/auth';
import asyncStorage from '../services/asyncStorage';

class Login extends React.Component {
  static propTypes = {
    handleSignIn: propTypes.func.isRequired,
    onPasswordReset: propTypes.func.isRequired,
    onSignUp: propTypes.func.isRequired,
  };
  state = {
    email: null,
    password: null,
    renderError: false,
    errorMessage: '',
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
    if (
      !this.state.email ||
      !this.state.password
      // uncomment for prod:
      // || this.state.password.length < 8
    ) {
      this.setState({
        renderError: true,
        errorMessage: 'Please enter a valid email and password.',
      });
      return;
    }
    const loginToken = await auth.login(this.state.email, this.state.password);
    if (loginToken.status !== 200) {
      this.setState({
        renderError: true,
        errorMessage: 'The email and password you have entered are incorrect.',
      });
      return;
    }
    console.log(
      `from backend accessToken: ${loginToken.response.access_token}`,
    );
    const storedToken = await asyncStorage._storeData(
      'ACCESS_TOKEN',
      loginToken.response.access_token,
    );
    const storedId = await asyncStorage._storeData(
      'USER_ID',
      JSON.stringify(loginToken.response.id),
    );
    if (!storedToken || !storedId) {
      this.setState({
        renderError: true,
        errorMessage: 'Login failed to process. Please try again.',
      });
    }
    this.props.handleSignIn();
  };
  renderError = () => {
    if (!this.state.renderError) return;
    return <Text style={styles.errorText}>{this.state.errorMessage}</Text>;
  };
  render() {
    return (
      <View style={styles.rectangle}>
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
        {this.renderError()}
        <TouchableOpacity onPress={this.transitionToForgotPasswordPage}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.loginButton}>
          <LoginButton handleLogin={this.handleLogin} />
        </View>
        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={this.transitionToForgotPasswordPage}>
            <Text style={styles.signUpText}>Sign up here</Text>
          </TouchableOpacity>
        </View>
        <Elipse style={styles.elipse} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeBackContainer: {
    marginBottom: 15,
    marginTop: 45,
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
  errorText: {
    marginTop: 10,
    marginLeft: 33,
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#ea1313',
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
  signUpContainer: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#555555',
  },
  signUpText: {
    color: '#ed762c',
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
