import React from 'react';
import {View, StyleSheet} from 'react-native';
import Landing from './Landing';
import LoginOrSignUp from './LoginOrSignUp';
import Login from './Login';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
//import ajax from '../ajax';

class App extends React.Component {
  state = {
    renderLandingPage: false,
    renderLoginOrSignUp: false,
    renderLogin: false,
    renderSignUp: false,
    renderPasswordReset: true,
  };
  // componentDidMount() {
  //   this.timeoutHandle = setTimeout(() => {
  //     this.setState({renderLandingPage: false, renderLoginOrSignUp: true});
  //   }, 3000);
  // }

  // componentWillUnmount() {
  //   // This is just necessary in the case that the screen is closed
  //   // before the timeout fires, otherwise it would cause a memory
  //   // leak that would trigger the transition regardless, breaking
  //   // the user experience.
  //   clearTimeout(this.timeoutHandle);
  // }

  renderLanding = () => {
    if (!this.state.renderLandingPage) return;
    return <Landing />;
  };

  renderLoginOrSignUp = () => {
    if (!this.state.renderLoginOrSignUp) return;
    return <LoginOrSignUp />;
  };
  renderLogin = () => {
    if (!this.state.renderLogin) return;
    return <Login />;
  };
  renderSignUp = () => {
    if (!this.state.signUp) return;
    return <SignUp />;
  };
  renderPasswordReset = () => {
    if (!this.state.renderPasswordReset) return;
    return <PasswordReset />;
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderLanding()}
        {this.renderLoginOrSignUp()}
        {this.renderLogin()}
        {this.renderSignUp()}
        {this.renderPasswordReset()}
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
