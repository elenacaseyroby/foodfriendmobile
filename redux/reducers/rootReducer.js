import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {customPathReducer} from './customPathReducer';
import {dailyProgressReducer} from './dailyProgressReducer';
import {dietsReducer} from './dietsReducer';
import {nutrientsReducer} from './nutrientsReducer';
import {pathsReducer} from './pathsReducer';
import {privacyPolicyReducer} from './privacyPolicyReducer';
import {recommendedFoodsReducer} from './recommendedFoodsReducer';
import {termsAndConditionsReducer} from './termsAndConditionsReducer';
import {userReducer} from './userReducer';
import {userFoodsReducer} from './userFoodsReducer';

export default combineReducers({
  auth: authReducer,
  customPath: customPathReducer,
  dailyProgress: dailyProgressReducer,
  diets: dietsReducer,
  nutrients: nutrientsReducer,
  paths: pathsReducer,
  privacyPolicy: privacyPolicyReducer,
  recommendedFoods: recommendedFoodsReducer,
  termsAndConditions: termsAndConditionsReducer,
  user: userReducer,
  userFoods: userFoodsReducer,
});
