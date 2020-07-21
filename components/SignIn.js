import React from 'react';
import {
  View,
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
import {normalize} from '../utils/sizeScaling';
import {routeDeepLink} from '../utils/navigation';
import plantMascot from '../assets/images/plant-mascot.png';
import FoodPlate from './common/FoodPlate';
import FFTextBox from './forms/FFTextBox';
import FFPasswordBox from './forms/FFPasswordBox';
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
    errorMessage = errorMessage || validatePassword(this.state.password);
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    }
    // Login.
    const login = await auth.login(this.state.email, this.state.password);
    errorMessage = getLoginError(login);
    // If login fails: throw error.
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    }
    // If login succeeds: store user_id and access_token in AsyncStorage
    // to persist user id and access token.
    // user id and access token will be used to get permission to
    // access to user data from the api.
    const result = await storeAsyncLoginData(
      login.response.userId,
      login.response.accessToken,
    );
    if (result !== 'success') {
      return this.setState({errorMessage: result});
    }
    // Update user state
    this.props.dispatch(fetchUser(login.response.userId));
    this.props.dispatch(setAuth());
  };
  renderError = () => {
    if (!this.state.errorMessage) return;
    return <Text style={styles.errorText}>{this.state.errorMessage}</Text>;
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <View style={styles.content}>
          <View style={styles.welcomeBackContainer}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Image style={styles.plantMascot} source={plantMascot} />
          </View>

          <FFTextBox
            placeholder="Email Address"
            handleChange={this.handleEmail}
            isLowercase={true}
          />
          <FFPasswordBox handleChange={this.handlePassword} />
          {this.renderError()}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Password Reset')}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>

          <View style={styles.loginButton}>
            <LoginButton handleLogin={this.handleLogin} />
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.dontHaveAccountText}>
              {"Don't have an account? "}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Sign Up')}>
              <Text style={styles.signUpText}>Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FoodPlate />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeBackContainer: {
    marginBottom: '3%',
    marginTop: normalize(40, 50),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    width: normalize(304),
    height: normalize(400),
    alignSelf: 'center',
    paddingBottom: 0,
  },
  welcomeText: {
    marginTop: '10%',
    color: '#555555',
    width: normalize(140),
    fontFamily: 'Cabin-SemiBold',
    fontSize: normalize(30),
  },
  plantMascot: {
    width: normalize(118),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 118 / 113,
  },
  errorText: {
    marginBottom: '3%',
    fontSize: normalize(14),
    fontFamily: 'Cabin-Regular',
    color: '#ea1313',
  },
  forgotPasswordText: {
    marginBottom: '6%',
    fontSize: normalize(14),
    fontFamily: 'Cabin-Regular',
    color: '#ed762c',
  },
  loginButton: {
    alignSelf: 'center',
    marginBottom: '3%',
  },
  signUpContainer: {
    marginTop: '3%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    fontSize: normalize(14),
  },
  dontHaveAccountText: {
    fontFamily: 'Cabin-Regular',
    color: '#555555',
    fontSize: normalize(14),
  },
  signUpText: {
    color: '#ed762c',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(14),
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: normalize(610),
    flex: 1,
    position: 'relative',
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(SignIn);
