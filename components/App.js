import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';
import asyncStorage from '../asyncStorage';
import Login from './Login';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import Progress from './Progress';
import Onboarding from './Onboarding';
import Home from './Home';

const Stack = createStackNavigator();

async function getUserIdIfLoggedIn() {
  const accessToken = await asyncStorage._retrieveData('ACCESS_TOKEN');
  const userId = await asyncStorage._retrieveData('USER_ID');
  if (!accessToken || !userId) return;
  return userId;
}

class App extends React.Component {
  componentDidMount = async () => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    this.timeoutHandle = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    const userId = await getUserIdIfLoggedIn();
    if (userId) {
      this.props.dispatch(fetchUser(userId));
    }
  };
  componentWillUnmount() {
    // This is just necessary in the case that the screen is closed
    // before the timeout fires, otherwise it would cause a memory
    // leak that would trigger the transition regardless, breaking
    // the user experience.
    clearTimeout(this.timeoutHandle);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {this.props.user.id ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Login" component={Login} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home} />
            </>
          )}
          <Stack.Screen name="Progress" component={Progress} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="PasswordReset" component={PasswordReset} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
