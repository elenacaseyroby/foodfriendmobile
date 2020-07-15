import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';
import {setAuth} from '../redux/actions/authActionCreator';
import {storeAsyncLoginData, getPasswordUpdateError} from '../utils/auth';
import {validatePassword} from '../utils/formValidation';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import Elipse from '../assets/images/bottom-elipse-blue.svg';
import FFPasswordBox from './forms/FFPasswordBox';
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
    const {userId, passwordResetToken} = this.props.route.params;
    const {password} = this.state;
    let errorMessage = validatePassword(password);
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    }
    const reset = await auth.resetPassword(
      userId,
      password,
      passwordResetToken,
    );
    errorMessage = getPasswordUpdateError(reset);
    if (errorMessage) {
      return this.setState({
        errorMessage: errorMessage,
      });
    }
    // If reset succeeds: store user id and accessToken in AsyncStorage
    // to persist login data.
    // access token and user id will be used to get permission to
    // access to user data from the api.
    const result = await storeAsyncLoginData(
      reset.response.userId,
      reset.response.accessToken,
    );
    if (result !== 'success') {
      return this.setState({errorMessage: result});
    }
    // Update user state
    this.props.dispatch(fetchUser(reset.response.userId));
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
          <View style={styles.updatePasswordContainer}>
            <Text style={styles.updateText}>Update Password</Text>
            <Image source={plantMascot} />
          </View>
          <FFPasswordBox handleChange={this.handlePassword} />
          {this.renderError()}
          <View style={styles.button}>
            <SubmitButton onClick={this.handleSubmit} />
          </View>
        </View>
        <Elipse style={styles.elipse} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  updatePasswordContainer: {
    marginBottom: 15,
    marginTop: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 120,
  },
  content: {
    width: 310,
    height: 600,
    alignSelf: 'center',
  },
  updateText: {
    marginTop: 25,
    color: '#555555',
    width: 140,
    height: 75,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 30,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#ea1313',
  },
  button: {
    marginTop: 20,
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
