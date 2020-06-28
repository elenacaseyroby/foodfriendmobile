import React from 'react';
import {View, TextInput, Text, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';
import {setAuth} from '../redux/actions/authActionCreator';
import asyncStorage from '../asyncStorage';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import Elipse from '../assets/images/bottom-elipse-blue.svg';
import SubmitButton from './common/SubmitButton';
import auth from '../services/auth';

class UpdatePassword extends React.Component {
  state = {
    password: null,
    errorMessage: null,
  };
  handlePassword = (password) => {
    this.setState({password: password});
  };
  handleSubmit = async () => {
    const reset = await auth.resetPassword(
      this.props.userId,
      this.state.password,
      this.props.passwordResetToken,
    );
    if (reset.status !== 200) {
      return this.setState({errorMessage: reset.response.message});
    }
    this.setState({errorMessage: null});
    // If reset succeeds: store user id and accessToken in AsyncStorage
    // to persist login data.
    // access token and user id will be used to get permission to
    // access to user data from the api.
    const storedToken = await asyncStorage._storeData(
      'ACCESS_TOKEN',
      reset.response.accessToken,
    );
    const storedId = await asyncStorage._storeData(
      'USER_ID',
      JSON.stringify(reset.response.id),
    );
    // If login data fails to store, throw error.
    if (!storedToken || !storedId) {
      return this.setState({
        errorMessage: 'Login failed to process. Please try again.',
      });
    }
    // Update user state
    this.props.dispatch(fetchUser(reset.response.id));
    this.props.dispatch(setAuth());
  };
  renderError = () => {
    if (!this.state.errorMessage) return;
    return <Text style={styles.errorText}>{this.state.errorMessage}</Text>;
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <View style={styles.updatePasswordContainer}>
          <Text style={styles.updateText}>Update Password</Text>
          <Image source={plantMascot} />
        </View>
        <TextInput
          style={styles.formText}
          secureTextEntry={true}
          placeholder="New Password (8+ characters)"
          onChangeText={this.handlePassword}
        />
        <View style={styles.formEmailBox} />
        {this.renderError()}
        <View style={styles.button}>
          <SubmitButton onClick={this.handleSubmit} />
        </View>
        <Elipse style={styles.elipse} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  updatePasswordContainer: {
    marginBottom: 15,
    marginTop: 40,
    marginLeft: 33,
    marginRight: 33,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 120,
  },
  updateText: {
    marginTop: 25,
    color: '#555555',
    width: 140,
    height: 75,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 30,
  },
  formText: {
    marginTop: 35,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
    width: 310,
    alignSelf: 'center',
  },
  formEmailBox: {
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
  button: {
    marginTop: 30,
    alignSelf: 'center',
    marginBottom: 10,
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

export default connect(mapStateToProps)(UpdatePassword);
