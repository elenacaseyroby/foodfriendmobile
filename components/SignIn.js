import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';
import {setAuth} from '../redux/actions/authActionCreator';
import {validateEmail, validatePassword} from '../utils/formValidation';
import {storeAsyncLoginData, getLoginError} from '../utils/auth';
import {routeDeepLink} from '../utils/navigation';
import plantMascot from '../assets/images/plant-mascot.png';
import Elipse from '../assets/images/bottom-elipse-green.svg';
import LoginButton from './common/LoginButton';
import auth from '../services/auth';

class SignIn extends React.Component {
  state = {
    email: null,
    password: null,
    errorMessage: null,
  };
  componentDidMount() {
    // Deep linking
    // (added to this page to link to UpdatePassword through link
    // when logged out.)
    const {navigate} = this.props.navigation;
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        routeDeepLink(url, {navigate});
      });
    } else {
      Linking.addEventListener('url', (event) =>
        routeDeepLink(event.url, {navigate}),
      );
    }
  }
  componentWillUnmount() {
    // Deep linking
    const {navigate} = this.props.navigation;
    Linking.removeEventListener('url', (event) =>
      routeDeepLink(event.url, {navigate}),
    );
  }
  handleEmail = (email) => {
    this.setState({email: email});
  };
  handlePassword = (password) => {
    this.setState({password: password});
  };
  handleLogin = async () => {
    // Validate fields.
    let errorMessage = validateEmail(this.state.email);
    if (!errorMessage) {
      errorMessage = validatePassword(this.state.password);
    }
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    }
    // Login.
    const login = await auth.login(this.state.email, this.state.password);
    console.log(JSON.stringify(login));
    errorMessage = getLoginError(login);
    // If login fails: throw error.
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    }
    // If login succeeds: store user_id and access_token in AsyncStorage
    // to persist user id and access token.
    // user id and access token will be used to get permission to
    // access to user data from the api.
    const result = storeAsyncLoginData(
      login.response.id,
      login.response.access_token,
    );
    if (result !== 'success') {
      return this.setState({errorMessage: result});
    }
    // Update user state
    this.props.dispatch(fetchUser(login.response.id));
    this.props.dispatch(setAuth());
  };
  renderError = () => {
    if (!this.state.errorMessage) return;
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

export default connect(mapStateToProps)(SignIn);
