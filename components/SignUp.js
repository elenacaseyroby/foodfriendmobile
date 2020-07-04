import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';
import {setAuth} from '../redux/actions/authActionCreator';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../utils/formValidation';
import {getSignUpError, storeAsyncLoginData} from '../utils/auth';
import BackArrow from '../assets/images/back-arrow.svg';
import FFTextBox from './forms/FFTextBox';
import FFPasswordBox from './forms/FFPasswordBox';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import SignUpButton from './common/SignUpButton';
import auth from '../services/auth';

class SignUp extends React.Component {
  state = {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    errorMessage: null,
  };
  handleEmail = (email) => {
    this.setState({email: email});
  };
  handlePassword = (password) => {
    this.setState({password: password});
  };
  handleFirstName = (firstName) => {
    this.setState({firstName: firstName});
  };
  handleLastName = (lastName) => {
    this.setState({lastName: lastName});
  };
  handleSignUp = async () => {
    // Validate fields.
    let errorMessage = validateName(this.state.firstName);
    if (!errorMessage) {
      errorMessage = validateName(this.state.lastName);
    }
    if (!errorMessage) {
      errorMessage = validateEmail(this.state.email);
    }
    if (!errorMessage) {
      errorMessage = validatePassword(this.state.password);
    }
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    }
    const signUp = await auth.signUp(
      this.state.email,
      this.state.password,
      this.state.firstName,
      this.state.lastName,
    );
    errorMessage = getSignUpError(signUp);
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    }
    const result = storeAsyncLoginData(
      signUp.response.id,
      signUp.response.access_token,
    );
    if (result !== 'success') {
      return this.setState({errorMessage: result});
    }
    this.props.dispatch(fetchUser(signUp.response.id));
    this.props.dispatch(setAuth());
  };
  renderError = () => {
    if (!this.state.errorMessage) return;
    return <Text style={styles.errorText}>{this.state.errorMessage}</Text>;
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => this.props.navigation.pop()}>
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Start your journey</Text>
          <Image source={plantMascot} />
        </View>
        <FFTextBox
          placeholder="First Name"
          handleChange={this.handleFirstName}
          isLowercase={false}
        />
        <FFTextBox
          placeholder="Last Name"
          handleChange={this.handleLastName}
          isLowercase={false}
        />
        <FFTextBox
          placeholder="Email Address"
          handleChange={this.handleEmail}
          isLowercase={true}
        />
        <FFPasswordBox handleChange={this.handlePassword} />
        {this.renderError()}
        <View style={styles.termsContainer}>
          <Text>By continuing, you agree to FoodFriend’s</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.termsTextOrange}>terms & conditions</Text>
          </TouchableOpacity>
          <Text>{` and `}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.termsTextOrange}>privacy policy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginButton}>
          <SignUpButton onClick={this.handleSignUp} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backArrow: {
    marginTop: 45,
    marginLeft: 33,
  },
  signUpContainer: {
    marginBottom: -15,
    marginTop: 10,
    marginLeft: 33,
    marginRight: 33,
    maxHeight: 150,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signUpText: {
    marginTop: 25,
    color: '#555555',
    width: 140,
    height: 75,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 30,
  },
  termsContainer: {
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
  errorText: {
    marginBottom: 15,
    marginTop: 10,
    marginLeft: 33,
    marginRight: 33,
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#ea1313',
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(SignUp);
