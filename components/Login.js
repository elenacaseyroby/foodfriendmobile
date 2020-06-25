import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';
import plantMascot from '../assets/images/plant-mascot.png';
import Elipse from '../assets/images/bottom-elipse-green.svg';
import LoginButton from './common/LoginButton';
import auth from '../services/auth';
import asyncStorage from '../asyncStorage';

class Login extends React.Component {
  state = {
    email: null,
    password: null,
    renderError: false,
    errorMessage: '',
  };
  handleEmail = (email) => {
    this.setState({email: email});
  };
  handlePassword = (password) => {
    this.setState({password: password});
  };
  handleLogin = async () => {
    // Validate fields.
    if (
      !this.state.email ||
      !this.state.password ||
      (this.state.email && !this.state.email.includes('@')) ||
      this.state.password.length < 8
    ) {
      this.setState({
        renderError: true,
        errorMessage: 'Please enter a valid email and password.',
      });
      return;
    }
    // Login.
    const login = await auth.login(this.state.email, this.state.password);
    // If login fails: throw error.
    if (login.status !== 200) {
      this.setState({
        renderError: true,
        errorMessage: 'The email and password you have entered are incorrect.',
      });
      return;
    }
    // If login succeeds: store user_id and access_token in AsyncStorage
    // to persist login data.
    const storedToken = await asyncStorage._storeData(
      'ACCESS_TOKEN',
      login.response.access_token,
    );
    const storedId = await asyncStorage._storeData(
      'USER_ID',
      JSON.stringify(login.response.id),
    );
    // If login data fails to store, throw error.
    if (!storedToken || !storedId) {
      this.setState({
        renderError: true,
        errorMessage: 'Login failed to process. Please try again.',
      });
      return;
    }
    // Update user state
    this.props.dispatch(fetchUser(login.response.id));
    this.props.navigation.navigate('Home');
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
          autoCapitalize="none"
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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('PasswordReset')}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.loginButton}>
          <LoginButton handleLogin={this.handleLogin} />
        </View>
        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Login);
