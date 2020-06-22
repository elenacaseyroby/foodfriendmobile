import React, {userReducer} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Landing from './Landing';
import Login from './Login';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import api from '../services/api';
import asyncStorage from '../services/asyncStorage';

class App extends React.Component {
  state = {
    renderLandingPage: true,
    renderLogin: false,
    renderSignUp: false,
    renderPasswordReset: false,
    renderMyPath: false,
    renderOnboarding: false,
    user: null,
  };
  componentDidMount = async () => {
    // Get access token and user id if user has already logged in.
    const accessToken = await asyncStorage._retrieveData('ACCESS_TOKEN');
    const userId = await asyncStorage._retrieveData('USER_ID');

    // TO TEST:
    // const accessToken = null;
    // const userId = null;

    if (accessToken && userId) {
      this.handleSignIn();
      this.timeoutHandle = setTimeout(() => {
        this.setState({renderLandingPage: false});
      }, 3000);
      return;
    }
    this.timeoutHandle = setTimeout(() => {
      this.setState({renderLandingPage: false, renderLogin: true});
    }, 3000);
  };
  componentWillUnmount() {
    // This is just necessary in the case that the screen is closed
    // before the timeout fires, otherwise it would cause a memory
    // leak that would trigger the transition regardless, breaking
    // the user experience.
    clearTimeout(this.timeoutHandle);
  }
  handleSignIn = async () => {
    const accessToken = await asyncStorage._retrieveData('ACCESS_TOKEN');
    const userId = await asyncStorage._retrieveData('USER_ID');
    const user = await api.getUser(userId, accessToken);
    if (user.status !== 200) {
      console.log(user);
      return;
    }
    this.setState({user: user.response});
    if (user.response.active_path_id) {
      this.setState({renderMyPath: true});
      console.log('render my path!');
      return;
    }
    console.log('render onboarding!!');
    this.setState({renderOnboarding: true});
    return;
  };
  renderLanding = () => {
    if (!this.state.renderLandingPage) return;
    return <Landing />;
  };
  renderLogin = () => {
    if (!this.state.renderLogin) return;
    return (
      <Login
        handleSignIn={this.handleSignIn}
        onPasswordReset={() =>
          this.setState({renderLogin: false, renderPasswordReset: true})
        }
        onSignUp={() => this.setState({renderLogin: false, renderSignUp: true})}
      />
    );
  };
  renderSignUp = () => {
    if (!this.state.signUp) return;
    return (
      <SignUp
        onBack={() => this.setState({renderLogin: true, renderSignUp: false})}
      />
    );
  };
  renderPasswordReset = () => {
    if (!this.state.renderPasswordReset) return;
    return <PasswordReset />;
  };
  renderMyPath = () => {
    if (!this.state.renderMyPath) return;
    return <Text>My Path</Text>;
  };
  renderOnboarding = () => {
    if (!this.state.renderOnboarding) return;
    return <Text>Onboarding</Text>;
  };
  render() {
    // Casey TODO:
    // get async storage and set token
    // if no token route to login page
    return (
      <View style={styles.container}>
        {this.renderLanding()}
        {this.renderLogin()}
        {this.renderSignUp()}
        {this.renderPasswordReset()}
        {this.renderMyPath()}
        {this.renderOnboarding()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 30,
  },
});

export default App;
