import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';
import {setAuth} from '../redux/actions/authActionCreator';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import Progress from './Progress';
import Onboarding from './Onboarding';
import Home from './Home';
//import asyncStorage from '../asyncStorage';

const Stack = createStackNavigator();

class App extends React.Component {
  componentDidMount = async () => {
    // log out to test:
    //asyncStorage._clearData();

    this.timeoutHandle = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    // start loading data while splash screen is shown:
    const authSet = await this.props.dispatch(setAuth());
    if (authSet && this.props.auth.userId) {
      this.props.dispatch(fetchUser(this.props.auth.userId));
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
          {this.props.auth.userId ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Progress" component={Progress} />
              <Stack.Screen name="Onboarding" component={Onboarding} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="PasswordReset" component={PasswordReset} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
