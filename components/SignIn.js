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
import {setAuth} from '../redux/actions/authActionCreator';
import {validateEmail, validatePassword} from '../utils/formValidation';
import {storeAsyncLoginData, getLoginError} from '../utils/auth';
import {normalize} from '../utils/deviceScaling';
import {routeDeepLink} from '../utils/navigation';
import plantMascot from '../assets/images/plant-mascot.png';
import FoodPlate from './common/FoodPlate';
import FFEmailTextBox from './forms/FFEmailTextBox';
import FFPasswordBox from './forms/FFPasswordBox';
import FFErrorMessage from './forms/FFErrorMessage';
import SignInButton from './common/SignInButton';
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
  handleSignIn = async () => {
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
    // sign in user.
    this.props.dispatch(setAuth());
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <View style={styles.content}>
          <View style={styles.welcomeBackContainer}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Image style={styles.plantMascot} source={plantMascot} />
          </View>

          <FFEmailTextBox onChangeText={this.handleEmail} />
          <FFPasswordBox onChangeText={this.handlePassword} />
          <FFErrorMessage errorMessage={this.state.errorMessage} />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Password Reset')}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>

          <View style={styles.signInButton}>
            <SignInButton handleLogin={this.handleSignIn} />
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
  welcomeText: {
    marginTop: '7%',
    color: '#555555',
    width: normalize(140),
    fontFamily: 'Cabin-SemiBold',
    fontSize: normalize(30, 80),
  },
  plantMascot: {
    width: normalize(118, 280),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 118 / 113,
  },
  forgotPasswordText: {
    marginBottom: '6%',
    fontSize: normalize(14),
    fontFamily: 'Cabin-Regular',
    color: '#ed762c',
  },
  signInButton: {
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
    color: '#aaaaaa',
    fontSize: normalize(14),
  },
  signUpText: {
    color: '#ed762c',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(14),
  },
  content: {
    width: normalize(310),
    alignSelf: 'center',
    marginBottom: '5%',
    // borderColor: '#aaaaaa',
    // borderWidth: 0.5,
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: normalize(600),
    flex: 1,
    position: 'relative',
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(SignIn);
