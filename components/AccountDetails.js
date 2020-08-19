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
import {setAuth} from '../redux/actions/authActionCreator';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../utils/formValidation';
import {getSignUpError, storeAsyncLoginData} from '../utils/auth';
import {normalize} from '../utils/deviceScaling';
import BackArrow from './common/BackArrow';
import FFEmailTextBox from './forms/FFEmailTextBox';
import FFNameTextBox from './forms/FFNameTextBox';
import FFPasswordBox from './forms/FFPasswordBox';
import FFErrorMessage from './forms/FFErrorMessage';
import FFNarrowButton from './common/FFNarrowButton';
import FFStatusBar from './common/FFStatusBar';
import auth from '../services/auth';

class AccountDetails extends React.Component {
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
  handleSubmit = async () => {
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
    // sign in user
    this.props.dispatch(setAuth());
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <FFStatusBar />
        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Account Details</Text>
            <BackArrow
              style={styles.backArrow}
              onPress={() => this.props.navigation.pop()}
            />
          </View>

          <FFNameTextBox
            placeholder={this.props.user.firstName}
            onChangeText={this.handleFirstName}
          />
          <FFNameTextBox
            placeholder={this.props.user.lastName}
            onChangeText={this.handleLastName}
          />
          <FFEmailTextBox
            placeholder={this.props.user.email}
            onChangeText={this.handleEmail}
          />
          <FFPasswordBox onChangeText={this.handlePassword} />
          <FFErrorMessage errorMessage={this.state.errorMessage} />
          <View style={styles.submitButton}>
            <FFNarrowButton label="Save" onClick={this.handleSubmit} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: '5%',
    width: normalize(310),
    height: normalize(40),
    alignSelf: 'center',
    flexDirection: 'row',
    alignContent: 'flex-end',
    justifyContent: 'space-between',
  },
  headerText: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Cabin-Medium',
    fontSize: normalize(18),
    color: '#555555',
    // borderColor: '#000000',
    // borderWidth: 1.0,
  },
  backArrow: {
    height: normalize(40),
    alignSelf: 'center',
    position: 'absolute',
    marginLeft: normalize(4),
  },
  submitButton: {
    alignSelf: 'center',
    marginBottom: '3%',
  },
  content: {
    width: normalize(310),
    height: normalize(540),
    alignSelf: 'center',
  },
  rectangle: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AccountDetails);
