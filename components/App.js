import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {fetchPaths} from '../redux/actions/pathsActionCreator';
import {fetchDiets} from '../redux/actions/dietsActionCreator';
import {fetchUser} from '../redux/actions/userActionCreator';
import {fetchTermsAndConditions} from '../redux/actions/termsAndConditionsActionCreator';
import {fetchPrivacyPolicy} from '../redux/actions/privacyPolicyActionCreator';
import {setAuth} from '../redux/actions/authActionCreator';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import UpdatePassword from './UpdatePassword';
import Progress from './Progress';
import OnboardingSlides from './OnboardingSlides';
import OnboardingSurvey from './OnboardingSurvey';
import Path from './Path';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
//import asyncStorage from '../asyncStorage';

const Stack = createStackNavigator();

class App extends React.Component {
  componentDidMount = async () => {
    // log out to test:
    //await asyncStorage._clearData();

    this.timeoutHandle = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    // start loading data while splash screen is shown:
    const authSet = await this.props.dispatch(setAuth());
    if (authSet && this.props.auth.userId) {
      this.props.dispatch(fetchUser(this.props.auth.userId));
    }
    this.props.dispatch(fetchTermsAndConditions());
    this.props.dispatch(fetchPrivacyPolicy());
    this.props.dispatch(fetchDiets());
    this.props.dispatch(fetchPaths());
  };
  componentWillUnmount() {
    // This is just necessary in the case that the screen is closed
    // before the timeout fires, otherwise it would cause a memory
    // leak that would trigger the transition regardless, breaking
    // the user experience.
    clearTimeout(this.timeoutHandle);
  }
  renderOnboardingSlides = () => {
    // If user is logged in and hasn't picked a path show them
    // the onboarding slides.
    if (this.props.user && !this.props.user.activePathId) {
      return (
        <Stack.Screen name="Onboarding Slides" component={OnboardingSlides} />
      );
    }
    return;
  };
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {this.props.auth.userId ? (
          <>
            {this.renderOnboardingSlides()}
            <Stack.Screen
              name="Onboarding Survey"
              component={OnboardingSurvey}
            />
            <Stack.Screen name="Progress" component={Progress} />
            <Stack.Screen name="Path" component={Path} />
          </>
        ) : (
          <>
            <Stack.Screen name="Sign In" component={SignIn} />
            <Stack.Screen name="Sign Up" component={SignUp} />
            <Stack.Screen name="Password Reset" component={PasswordReset} />
            <Stack.Screen name="Update Password" component={UpdatePassword} />
            <Stack.Screen
              name="Terms And Conditions"
              component={TermsAndConditions}
            />
            <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
          </>
        )}
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps)(App);
