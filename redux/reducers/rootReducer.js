import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {dailyProgressReducer} from './dailyProgressReducer';
import {dietsReducer} from './dietsReducer';
import {nutrientsReducer} from './nutrientsReducer';
import {privacyPolicyReducer} from './privacyPolicyReducer';
import {termsAndConditionsReducer} from './termsAndConditionsReducer';
import {userReducer} from './userReducer';
import {userFoodsReducer} from './userFoodsReducer';

export default combineReducers({
  auth: authReducer,
  dailyProgress: dailyProgressReducer,
  diets: dietsReducer,
  nutrients: nutrientsReducer,
  privacyPolicy: privacyPolicyReducer,
  termsAndConditions: termsAndConditionsReducer,
  user: userReducer,
  userFoods: userFoodsReducer,
});
