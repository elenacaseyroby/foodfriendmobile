import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {customPathReducer} from './customPathReducer';
import {dietsReducer} from './dietsReducer';
import {nutrientsReducer} from './nutrientsReducer';
import {pathsReducer} from './pathsReducer';
import {privacyPolicyReducer} from './privacyPolicyReducer';
import {termsAndConditionsReducer} from './termsAndConditionsReducer';
import {userReducer} from './userReducer';

export default combineReducers({
  auth: authReducer,
  customPath: customPathReducer,
  diets: dietsReducer,
  nutrients: nutrientsReducer,
  paths: pathsReducer,
  privacyPolicy: privacyPolicyReducer,
  termsAndConditions: termsAndConditionsReducer,
  user: userReducer,
});
