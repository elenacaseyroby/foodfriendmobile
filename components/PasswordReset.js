import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {validateEmail} from '../utils/formValidation';
import {getPasswordResetError} from '../utils/auth';
import BackArrow from '../assets/images/back-arrow.svg';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import Elipse from '../assets/images/bottom-elipse-blue.svg';
import FFTextBox from './forms/FFTextBox';
import SubmitButton from './common/SubmitButton';
import auth from '../services/auth';

class PasswordReset extends React.Component {
  state = {
    email: null,
    submitted: false,
    renderForm: true,
    errorMessage: null,
  };
  handleEmail = (email) => {
    this.setState({email: email});
  };
  handleSubmit = async () => {
    this.setState({renderForm: false});
    let errorMessage = validateEmail(this.state.email);
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage, renderForm: true});
    }
    const response = await auth.requestPasswordResetEmail(this.state.email);
    errorMessage = getPasswordResetError(response);
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage, renderForm: true});
    }
    this.setState({submitted: true});
  };
  renderError = () => {
    if (!this.state.errorMessage) return;
    return <Text style={styles.errorText}>{this.state.errorMessage}</Text>;
  };
  renderForm = () => {
    if (!this.state.renderForm) return;
    return (
      <>
        <FFTextBox
          placeholder="Email Address"
          handleChange={this.handleEmail}
          isLowercase={true}
        />
        {this.renderError()}
        <View style={styles.button}>
          <SubmitButton onClick={this.handleSubmit} />
        </View>
      </>
    );
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => this.props.navigation.pop()}>
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.ForgotPasswordContainer}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
          <Image source={plantMascot} />
        </View>
        {this.state.submitted ? (
          <Text style={styles.successText}>
            A password reset email has been sent to {this.state.email}.
          </Text>
        ) : (
          this.renderForm()
        )}
        <Elipse style={styles.elipse} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backArrow: {
    marginTop: 45,
    marginLeft: 33,
  },
  ForgotPasswordContainer: {
    marginBottom: 15,
    marginTop: 20,
    marginLeft: 33,
    marginRight: 33,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 120,
  },
  forgotText: {
    marginTop: 25,
    color: '#555555',
    width: 140,
    height: 75,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 30,
  },
  successText: {
    marginTop: 35,
    marginLeft: 33,
    marginRight: 33,
    fontSize: 20,
    fontFamily: 'Cabin-Regular',
    color: '#555555',
  },
  errorText: {
    marginLeft: 33,
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#ea1313',
  },
  button: {
    marginTop: 15,
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

export default PasswordReset;
