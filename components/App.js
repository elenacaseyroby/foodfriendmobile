import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {fetchTermsAndConditions} from '../redux/actions/termsAndConditionsActionCreator';
import {fetchPrivacyPolicy} from '../redux/actions/privacyPolicyActionCreator';
import {setAuth} from '../redux/actions/authActionCreator';
import {fetchAllSignedInData} from '../redux/bulkFetch';
import AccountMenu from './AccountMenu';
import AccountDetails from './AccountDetails';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import UpdatePassword from './UpdatePassword';
import Progress from './Progress';
import OnboardingSlides from './OnboardingSlides';
import OnboardingSurvey from './OnboardingSurvey';
import Dashboard from './Dashboard';
import NutrientDetail from './NutrientDetail';
import MyPath from './MyPath';
import CustomizePath from './CustomizePath';
import SelectPath from './SelectPath';
import PathDetail from './PathDetail';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
// import asyncStorage from '../asyncStorage';

const Stack = createStackNavigator();

class App extends React.Component {
  componentDidMount = async () => {
    // log out to test:
    // await asyncStorage._clearData();

    this.timeoutHandle = setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
    // start loading data while splash screen is shown:
    const authSet = await this.props.dispatch(setAuth());
    if (authSet && this.props.auth && this.props.auth.userId) {
      const userId = this.props.auth.userId;
      // if user is already logged in, fetch logged in data
      fetchAllSignedInData(this.props.dispatch, userId);
    }
    // fetch non signed in data
    this.props.dispatch(fetchTermsAndConditions());
    this.props.dispatch(fetchPrivacyPolicy());
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // fixes warning but then can't use transitions:
          // animationEnabled: false,
        }}>
        {/*Starts on sign in page and navigates to dashboard if logged in*/}
        {/* Signed out screens: */}
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Password Reset" component={PasswordReset} />
        <Stack.Screen name="Update Password" component={UpdatePassword} />
        {/*Signed in screens: */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Progress" component={Progress} />
        <Stack.Screen name="My Path" component={MyPath} />
        <Stack.Screen name="Account Menu" component={AccountMenu} />
        <Stack.Screen name="Select Path" component={SelectPath} />
        <Stack.Screen name="Path Detail" component={PathDetail} />
        <Stack.Screen name="Customize Path" component={CustomizePath} />
        <Stack.Screen name="Nutrient Detail" component={NutrientDetail} />
        <Stack.Screen name="Account Details" component={AccountDetails} />
        <Stack.Screen name="Onboarding Slides" component={OnboardingSlides} />
        <Stack.Screen name="Onboarding Survey" component={OnboardingSurvey} />
        {/* Signed in/out screens: */}
        <Stack.Screen
          name="Terms And Conditions"
          component={TermsAndConditions}
        />
        <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps)(App);
