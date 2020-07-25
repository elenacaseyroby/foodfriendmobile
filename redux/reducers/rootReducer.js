import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {dietsReducer} from './dietsReducer';
import {pathsReducer} from './pathsReducer';
import {privacyPolicyReducer} from './privacyPolicyReducer';
import {termsAndConditionsReducer} from './termsAndConditionsReducer';
import {userReducer} from './userReducer';

export default combineReducers({
  auth: authReducer,
  diets: dietsReducer,
  paths: pathsReducer,
  privacyPolicy: privacyPolicyReducer,
  termsAndConditions: termsAndConditionsReducer,
  user: userReducer,
});
