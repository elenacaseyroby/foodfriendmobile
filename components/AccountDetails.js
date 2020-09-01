import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../utils/formValidation';
import {getUserUpdateError} from '../utils/auth';
import {normalize} from '../utils/deviceScaling';
import {fetchUser} from '../redux/actions/userActionCreator';
import {fetchPaths} from '../redux/actions/pathsActionCreator';
import BackArrow from './common/BackArrow';
import FFEmailTextBox from './forms/FFEmailTextBox';
import FFNameTextBox from './forms/FFNameTextBox';
import FFPasswordBox from './forms/FFPasswordBox';
import FFErrorMessage from './forms/FFErrorMessage';
import FFNarrowButton from './common/FFNarrowButton';
import FFStatusBar from './common/FFStatusBar';
import FFRadioButtons from './forms/FFRadioButtons';
import Elipse from './common/BlueBottomElipse';
import api from '../services/api';

class AccountDetails extends React.Component {
  state = {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    isVegan: this.props.user.isVegan,
  };
  resetState = () => {
    console.log('reset!');
    console.log(this.state.isVegan);
    console.log(this.props.user.isVegan);
    this.setState({
      errorMessage: null,
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      isVegan: this.props.user.isVegan,
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
    const {user} = this.props;
    const isVeganUpdated = this.state.isVegan !== user.isVegan;
    let body = {};
    let errorMessage;
    this.setState({errorMessage: null});
    // If feild exists, validate and add to body.
    if (this.state.firstName) {
      errorMessage = validateName(this.state.firstName);
      if (!errorMessage && this.state.firstName !== user.firstName) {
        body.firstName = this.state.firstName;
      } else {
        this.setState({errorMessage: errorMessage});
      }
    }
    if (this.state.lastName) {
      errorMessage = validateName(this.state.lastName);
      if (!errorMessage && this.state.lastName !== user.lastName) {
        body.lastName = this.state.lastName;
      } else if (!this.state.errorMessage) {
        this.setState({errorMessage: errorMessage});
      }
    }
    if (this.state.email) {
      errorMessage = validateEmail(this.state.email);
      if (!errorMessage && this.state.email !== user.email) {
        body.email = this.state.email;
      } else if (!this.state.errorMessage) {
        this.setState({errorMessage: errorMessage});
      }
    }
    if (this.state.password) {
      errorMessage = validatePassword(this.state.password);
      if (!errorMessage) {
        body.password = this.state.password;
      } else if (!this.state.errorMessage) {
        this.setState({errorMessage: errorMessage});
      }
    }
    if (isVeganUpdated) {
      body.isVegan = this.state.isVegan;
    }
    // If error with a form field or there is nothing to change, do not update user.
    if (errorMessage || !body) return;
    // Send body in http request to update user.
    const update = await api.putUser(user.id, body);
    errorMessage = getUserUpdateError(update);
    // If error on update, display error message.
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    } else {
      // Otherwise reset state.
      this.resetState();
    }

    // Update user and state.
    this.props.dispatch(fetchUser(user.id));
    // Since user properties like isVegan and menstruates
    // are used to determine the user's path and the list
    // of paths they can choose from, we must also update
    // the list of paths they can choose from.
    this.props.dispatch(fetchPaths(user.id));
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
  handleIsVegan = (isVegan) => {
    this.setState({isVegan: isVegan});
  };
  renderStaticFormField(fieldName, value) {
    return (
      <>
        <View style={styles.textAndEditContainer}>
          <Text style={styles.staticFormText}>{value}</Text>
          <TouchableOpacity onPress={() => this.handleEdit(fieldName, value)}>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.staticFormBox} />
      </>
    );
  }
  render() {
    const {user} = this.props;
    console.log(JSON.stringify(user));
    const veganSelectedValue = this.state.isVegan ? 'yes' : 'no';
    return (
      <View style={styles.rectangle}>
        <FFStatusBar />
        <View style={styles.content}>
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
            this.renderStaticFormField('password', '*****')
          )}
          <FFRadioButtons
            label="Are you vegan?"
            onChange={this.handleIsVegan}
            allowOptOut={false}
            defaultSelectedValue={veganSelectedValue}
          />
          <FFErrorMessage errorMessage={this.state.errorMessage} />
        </View>
        <View style={styles.submitButton}>
          <FFNarrowButton label="Save" onClick={this.handleSubmit} />
        </View>
        <Elipse style={styles.elipse} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: '5%',
    marginBottom: '2%',
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
    fontSize: normalize(25),
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
  content: {
    width: normalize(310),
    alignSelf: 'center',
  },
  scroll: {
    minHeight: '100%',
  },
  rectangle: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  staticFormText: {
    fontSize: normalize(16),
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
    width: normalize(275),
  },
  staticFormBox: {
    marginTop: '3%',
    marginBottom: '5%',
    borderBottomWidth: normalize(0.5),
    color: '#aaaaaa',
    width: normalize(310),
  },
  textAndEditContainer: {
    height: normalize(40),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  editText: {
    color: '#5f7ec6',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(14),
    // borderColor: '#000000',
    // borderWidth: 1.0,
  },
  submitButton: {
    alignSelf: 'center',
  },
  elipse: {
    bottom: 0,
    position: 'absolute',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  paths: state.paths,
});

export default connect(mapStateToProps)(AccountDetails);
