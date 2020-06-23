import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BackArrow from '../assets/images/back-arrow.svg';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import SignUpButton from './common/SignUpButton';
import asyncStorage from '../services/asyncStorage';
import auth from '../services/auth';

class Login extends React.Component {
  state = {
    email: null,
    password: null,
    first_name: null,
    last_name: null,
    renderError: false,
    errorMessage: '',
  };
  handleEmail = (email) => {
    this.setState({email: email});
  };
  handlePassword = (password) => {
    this.setState({password: password});
  };
  handleFirstName = (first_name) => {
    this.setState({first_name: first_name});
  };
  handleLastName = (last_name) => {
    this.setState({last_name: last_name});
  };
  handleSignUp = async () => {
    if (
      !this.state.email ||
      !this.state.password ||
      !this.state.first_name ||
      !this.state.last_name
    ) {
      this.setState({
        renderError: true,
        errorMessage: 'Please provide a response to all of the above fields.',
      });
      return;
    } else if (
      !this.state.email.includes('@') ||
      this.state.email.length > 100 ||
      this.state.password.length < 8 ||
      this.state.password.length > 100 ||
      this.state.first_name.length > 100 ||
      this.state.last_name.length > 100
    ) {
      this.setState({
        renderError: true,
        errorMessage:
          'Please make sure you provide a valid email address and that your responses are not too long.',
      });
      return;
    }
    console.log('MADE IT!');
    const loginToken = await auth.signUp(
      this.state.email,
      this.state.password,
      this.state.first_name,
      this.state.last_name,
    );
    if (loginToken.status !== 200) {
      this.setState({
        renderError: true,
        errorMessage: loginToken.response.message,
      });
      return;
    }
    // If logs in successfully, store user_id and access_token in AsyncStorage.
    const storedToken = await asyncStorage._storeData(
      'ACCESS_TOKEN',
      loginToken.response.access_token,
    );
    const storedId = await asyncStorage._storeData(
      'USER_ID',
      JSON.stringify(loginToken.response.id),
    );
    return this.props.navigation.navigate('Home');
  };
  renderError = () => {
    if (!this.state.renderError) return;
    return <Text style={styles.errorText}>{this.state.errorMessage}</Text>;
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => this.props.navigation.pop()}>
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.welcomeBackContainer}>
          <Text style={styles.welcomeText}>Start your journey</Text>
          <Image source={plantMascot} />
        </View>
        <TextInput
          style={styles.formText}
          placeholder="First Name"
          onChangeText={this.handleFirstName}
        />
        <View style={styles.formTextBox} />
        <TextInput
          style={styles.formText}
          placeholder="Last Name"
          onChangeText={this.handleLastName}
        />
        <View style={styles.formTextBox} />
        <TextInput
          style={styles.formText}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
        <View style={styles.formTextBox} />
        <TextInput
          style={styles.formText}
          secureTextEntry={true}
          placeholder="Password (8+ characters)"
          onChangeText={this.handlePassword}
        />
        <View style={styles.formPasswordBox} />
        {this.renderError()}
        <View style={styles.termsContainer}>
          <Text>By continuing, you agree to FoodFriend’s</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.termsTextOrange}>terms & conditions</Text>
          </TouchableOpacity>
          <Text>{` and `}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.termsTextOrange}>privacy policy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginButton}>
          <SignUpButton onClick={this.handleSignUp} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backArrow: {
    marginTop: 45,
    marginLeft: 33,
  },
  welcomeBackContainer: {
    marginTop: 10,
    marginLeft: 33,
    marginRight: 33,
    maxHeight: 150,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  welcomeText: {
    marginTop: 25,
    color: '#555555',
    width: 140,
    height: 75,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 30,
  },
  formText: {
    marginBottom: 12,
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
    width: 310,
    alignSelf: 'center',
  },
  formTextBox: {
    marginBottom: 25,
    borderBottomWidth: 0.5,
    width: 310,
    alignSelf: 'center',
  },
  formPasswordBox: {
    borderBottomWidth: 0.5,
    width: 310,
    alignSelf: 'center',
  },
  termsContainer: {
    marginTop: 20,
    marginLeft: 33,
    marginRight: 33,
    marginBottom: 30,
    maxHeight: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
  },
  termsTextOrange: {
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#ed762c',
  },
  loginButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  errorText: {
    marginTop: 10,
    marginLeft: 33,
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#ea1313',
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
    flex: 1,
  },
});

export default Login;
