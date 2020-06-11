import React from 'react';
import {View, StyleSheet} from 'react-native';
import Landing from './Landing';
import Login from './Login';
//import ajax from '../ajax';

class App extends React.Component {
  state = {
    renderLandingPage: true,
    userLoggedIn: false,
  };
  componentDidMount() {
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(() => {
      this.setState({renderLandingPage: false});
    }, 4000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }

  renderLanding = () => {
    if (!this.state.renderLandingPage) return;
    return <Landing />;
  };

  renderLogin = () => {
    if (this.state.userLoggedIn) return;
    return <Login />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderLanding()}
        {this.renderLogin()}
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
