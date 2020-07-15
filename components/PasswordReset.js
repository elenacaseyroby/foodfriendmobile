import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {validateEmail} from '../utils/formValidation';
import {getPasswordResetError} from '../utils/auth';
import BackArrow from '../components/common/BackArrow';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import Elipse from './common/BlueBottomElipse';
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
        <View style={styles.content}>
          <View style={styles.ForgotPasswordContainer}>
            <View style={styles.arrowAndTextContainer}>
              <View style={styles.backArrow}>
                <BackArrow onPress={() => this.props.navigation.pop()} />
              </View>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </View>
            <Image source={plantMascot} />
          </View>
          {this.state.submitted ? (
            <Text style={styles.successText}>
              A password reset email has been sent to {this.state.email}.
            </Text>
          ) : (
            this.renderForm()
          )}
        </View>
        <Elipse />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ForgotPasswordContainer: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 135,
  },
  content: {
    width: 310,
    height: 600,
    alignSelf: 'center',
  },
  backArrow: {
    marginTop: 10,
    marginBottom: 20,
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
    fontSize: 20,
    fontFamily: 'Cabin-Regular',
    color: '#555555',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#ea1313',
  },
  button: {
    marginTop: 15,
    alignSelf: 'center',
    marginBottom: 10,
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
    flex: 1,
  },
});

export default PasswordReset;
