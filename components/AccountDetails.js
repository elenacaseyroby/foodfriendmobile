import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {setAuth} from '../redux/actions/authActionCreator';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../utils/formValidation';
import {getUserUpdateError} from '../utils/auth';
import {normalize} from '../utils/deviceScaling';
import BackArrow from './common/BackArrow';
import FFEmailTextBox from './forms/FFEmailTextBox';
import FFNameTextBox from './forms/FFNameTextBox';
import FFPasswordBox from './forms/FFPasswordBox';
import FFErrorMessage from './forms/FFErrorMessage';
import FFNarrowButton from './common/FFNarrowButton';
import FFStatusBar from './common/FFStatusBar';
import api from '../services/api';

class AccountDetails extends React.Component {
  state = {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
  };
  resetState = () => {
    this.setState({
      errorMessage: null,
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    });
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
    let body = {};
    let errorMessage;
    this.setState({errorMessage: null});
    // if feild exists, validate and add to body.
    if (this.state.firstName) {
      errorMessage = validateName(this.state.firstName);
      if (!errorMessage) {
        body.firstName = this.state.firstName;
      } else {
        this.setState({errorMessage: errorMessage});
      }
    }
    if (this.state.lastName) {
      errorMessage = validateName(this.state.lastName);
      if (!errorMessage) {
        body.lastName = this.state.lastName;
      } else if (!this.state.errorMessage) {
        this.setState({errorMessage: errorMessage});
      }
    }
    if (this.state.email) {
      errorMessage = validateEmail(this.state.email);
      if (!errorMessage) {
        body.email = this.state.email;
      } else if (!this.state.errorMessage) {
        this.setState({errorMessage: errorMessage});
      }
    }
    if (this.state.password) {
      errorMessage = validateEmail(this.state.password);
      if (!errorMessage) {
        body.password = this.state.password;
      } else if (!this.state.errorMessage) {
        this.setState({errorMessage: errorMessage});
      }
    }
    // If error with a form field, do not update user.
    if (errorMessage) return;
    // Send body in http request to update user.
    const update = await api.putUser(this.state.user.id, body);
    errorMessage = getUserUpdateError(update);
    // if error on update, display error message.
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    } else {
      // otherwise reset state.
      this.resetState();
    }
  };
  handleEdit = (fieldName, value) => {
    if (fieldName === 'firstName') {
      return this.setState({firstName: value});
    }
    if (fieldName === 'lastName') {
      return this.setState({lastName: value});
    }
    if (fieldName === 'email') {
      return this.setState({email: value});
    }
    if (fieldName === 'password') {
      return this.setState({password: value});
    }
  };
  renderStaticFormField(fieldName, value) {
    console.log('static');
    return (
      <>
        {/* CASEY: add styles to make this a row and style edit button */}

        <View style={styles.textAndEditContainer}>
          <Text style={styles.formText}>{value}</Text>
          <TouchableOpacity onPress={() => this.handleEdit(fieldName, value)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formBox} />
      </>
    );
  }
  render() {
    const {user} = this.props;
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
          {this.state.firstName ? (
            <FFNameTextBox
              placeholder={user.firstName}
              onChangeText={this.handleFirstName}
            />
          ) : (
            this.renderStaticFormField('firstName', user.firstName)
          )}
          {this.state.lastName ? (
            <FFNameTextBox
              placeholder={this.props.user.lastName}
              onChangeText={this.handleLastName}
            />
          ) : (
            this.renderStaticFormField('lastName', user.lastName)
          )}
          {this.state.email ? (
            <FFEmailTextBox
              placeholder={this.props.user.email}
              onChangeText={this.handleEmail}
            />
          ) : (
            this.renderStaticFormField('email', user.email)
          )}
          {this.state.password ? (
            <FFPasswordBox onChangeText={this.handlePassword} />
          ) : (
            this.renderStaticFormField('password', '***')
          )}
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
  staticFormText: {
    marginTop: '5%',
    marginBottom: '3%',
    fontSize: normalize(16),
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
    width: normalize(310),
  },
  staticFormBox: {
    marginBottom: '5%',
    borderBottomWidth: normalize(0.5),
    color: '#aaaaaa',
    width: normalize(310),
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AccountDetails);
