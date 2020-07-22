import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';
import {setAuth} from '../redux/actions/authActionCreator';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../utils/formValidation';
import {getSignUpError, storeAsyncLoginData} from '../utils/auth';
import {normalize} from '../utils/sizeScaling';
import BackArrow from './common/BackArrow';
import FFTextBox from './forms/FFTextBox';
import FFPasswordBox from './forms/FFPasswordBox';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import SignUpButton from './common/SignUpButton';
import Elipse from './common/BlueBottomElipse';
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
    errorMessage = errorMessage || validateName(this.state.lastName);
    errorMessage = errorMessage || validateEmail(this.state.email);
    errorMessage = errorMessage || validatePassword(this.state.password);
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
    const result = await storeAsyncLoginData(
      signUp.response.userId,
      signUp.response.accessToken,
    );
    if (result !== 'success') {
      return this.setState({errorMessage: result});
    }
    this.props.dispatch(fetchUser(signUp.response.userId));
    this.props.dispatch(setAuth());
  };
  renderError = () => {
    if (!this.state.errorMessage) return;
    return <Text style={styles.errorText}>{this.state.errorMessage}</Text>;
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <ScrollView style={styles.content}>
          <View style={styles.signUpContainer}>
            <View style={styles.arrowAndTextContainer}>
              <View style={styles.backArrow}>
                <BackArrow onPress={() => this.props.navigation.pop()} />
              </View>
              <Text style={styles.signUpText}>Start your journey</Text>
            </View>
            <Image style={styles.plantMascot} source={plantMascot} />
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
            <Text style={styles.termsTextGray}>
              {'By signing up, you agree to our '}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Terms And Conditions')
              }>
              <Text style={styles.termsTextOrange}>{'terms & conditions'}</Text>
            </TouchableOpacity>
            <Text style={styles.termsTextGray}>{` and `}</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Privacy Policy')}>
              <Text style={styles.termsTextOrange}>privacy policy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signUpButton}>
            <SignUpButton onClick={this.handleSignUp} />
          </View>
        </ScrollView>
        <Elipse />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backArrow: {
    marginTop: '5%',
    marginLeft: '3%',
  },
  signUpContainer: {
    marginBottom: '3%',
    marginTop: normalize(40, 50),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signUpText: {
    marginTop: '5%',
    color: '#555555',
    width: normalize(140),
    fontFamily: 'Cabin-SemiBold',
    fontSize: normalize(30, 60),
  },
  plantMascot: {
    width: normalize(131, 300),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '6%',
  },
  termsTextGray: {
    fontSize: normalize(14),
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
  },
  termsTextOrange: {
    fontSize: normalize(14),
    fontFamily: 'Cabin-Regular',
    color: '#ed762c',
  },
  signUpButton: {
    alignSelf: 'center',
    marginBottom: '3%',
  },
  errorText: {
    marginBottom: '3%',
    fontSize: normalize(14),
    fontFamily: 'Cabin-Regular',
    color: '#ea1313',
  },
  content: {
    width: normalize(310),
    height: normalize(540),
    alignSelf: 'center',
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: normalize(610),
    flex: 1,
    position: 'relative',
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(SignUp);
