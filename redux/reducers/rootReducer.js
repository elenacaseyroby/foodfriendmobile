import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {privacyPolicyReducer} from './privacyPolicyReducer';
import {termsAndConditionsReducer} from './termsAndConditionsReducer';
import {userReducer} from './userReducer';

export default combineReducers({
  auth: authReducer,
  privacyPolicy: privacyPolicyReducer,
  termsAndConditions: termsAndConditionsReducer,
  user: userReducer,
});
