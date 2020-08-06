import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {dietsReducer} from './dietsReducer';
import {nutrientsReducer} from './nutrientsReducer';
import {pathsReducer} from './pathsReducer';
import {privacyPolicyReducer} from './privacyPolicyReducer';
import {termsAndConditionsReducer} from './termsAndConditionsReducer';
import {userReducer} from './userReducer';

export default combineReducers({
  auth: authReducer,
  diets: dietsReducer,
  nutrients: nutrientsReducer,
  paths: pathsReducer,
  privacyPolicy: privacyPolicyReducer,
  termsAndConditions: termsAndConditionsReducer,
  user: userReducer,
});
