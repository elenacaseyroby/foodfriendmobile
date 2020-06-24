import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Login from './Login';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import Progress from './Progress';
import Onboarding from './Onboarding';
import Home from './Home';
import configureStore from '../redux/store';

let store = configureStore();
const Stack = createStackNavigator();

class App extends React.Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
            <Stack.Screen name="Progress" component={Progress} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
