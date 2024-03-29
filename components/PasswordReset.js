import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {validateEmail} from '../utils/formValidation';
import {getPasswordResetError} from '../utils/auth';
import {normalize} from '../utils/deviceScaling';
import BackArrow from '../components/common/BackArrow';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import Elipse from './common/BlueBottomElipse';
import FFEmailTextBox from './forms/FFEmailTextBox';
import FFErrorMessage from './forms/FFErrorMessage';
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
  renderForm = () => {
    if (!this.state.renderForm) return;
    return (
      <>
        <FFEmailTextBox onChangeText={this.handleEmail} />
        <FFErrorMessage errorMessage={this.state.errorMessage} />
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
            <Image style={styles.plantMascot} source={plantMascot} />
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
  backArrow: {
    marginTop: '5%',
  },
  ForgotPasswordContainer: {
    marginTop: normalize(35, 50),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plantMascot: {
    width: normalize(131),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
  forgotText: {
    marginTop: '40%',
    color: '#555555',
    width: normalize(140),
    fontFamily: 'Cabin-SemiBold',
    fontSize: normalize(30),
  },
  successText: {
    marginTop: '30%',
    fontSize: normalize(20),
    fontFamily: 'Cabin-Regular',
    color: '#555555',
  },
  button: {
    marginTop: '5%',
    alignSelf: 'center',
  },
  content: {
    width: normalize(310),
    height: normalize(310),
    alignSelf: 'center',
    // borderColor: '#aaaaaa',
    // borderWidth: 0.5,
  },
  rectangle: {
    backgroundColor: '#ffffff',
    position: 'relative',
    minHeight: normalize(310),
    flex: 1,
  },
});

export default PasswordReset;
