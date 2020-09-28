import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';
import {setAuth} from '../redux/actions/authActionCreator';
import {storeAsyncLoginData, getPasswordUpdateError} from '../utils/auth';
import {validatePassword} from '../utils/formValidation';
import {normalize} from '../utils/deviceScaling';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import Elipse from './common/BlueBottomElipse';
import FFPasswordBox from './forms/FFPasswordBox';
import FFErrorMessage from './forms/FFErrorMessage';
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
    const {password} = this.state;
    let errorMessage = validatePassword(password);
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    }
    if (!this.props.route.params) {
      return this.setState({
        errorMessage:
          'Password reset attempt failed.  Please click on the link in your password reset email and try again.',
      });
    }
    const {userId, passwordResetToken} = this.props.route.params;
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
    // Update user state.
    this.props.dispatch(fetchUser(reset.response.userId));
    // Sign in user.
    this.props.dispatch(setAuth());
  };
  render() {
    // If user is logged in, redirect to dashboard
    if (this.props.auth && this.props.auth.userId) {
      this.props.navigation.navigate('Dashboard');
      return <></>;
    }
    return (
      <View style={styles.rectangle}>
        <View style={styles.content}>
          <View style={styles.updatePasswordContainer}>
            <Text style={styles.updateText}>Update Password</Text>
            <Image style={styles.plantMascot} source={plantMascot} />
          </View>
          <FFPasswordBox onChangeText={this.handlePassword} />
          <FFErrorMessage errorMessage={this.state.errorMessage} />
          <View style={styles.button}>
            <SubmitButton onClick={this.handleSubmit} />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Sign In')}>
            <Text style={styles.navigateToLoginText}>Go to Sign In Screen</Text>
          </TouchableOpacity>
        </View>
        <Elipse />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  updatePasswordContainer: {
    marginTop: normalize(40, 60),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateText: {
    marginTop: '3%',
    color: '#555555',
    width: normalize(140),
    fontFamily: 'Cabin-SemiBold',
    fontSize: normalize(30),
  },
  plantMascot: {
    width: normalize(131),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
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
  navigateToLoginText: {
    marginTop: '5%',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(14),
    color: '#ed762c',
    alignSelf: 'center',
    textAlign: 'center',
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UpdatePassword);
