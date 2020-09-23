import {combineReducers} from 'redux';
import {activePathRecipesReducer} from './activePathRecipesReducer';
import {authReducer} from './authReducer';
import {dailyProgressReducer} from './dailyProgressReducer';
import {dietsReducer} from './dietsReducer';
import {nutrientsReducer} from './nutrientsReducer';
import {privacyPolicyReducer} from './privacyPolicyReducer';
import {recentlyConsumedFoodsReducer} from './recentlyConsumedFoodsReducer';
import {termsAndConditionsReducer} from './termsAndConditionsReducer';
import {userReducer} from './userReducer';
import {userFoodsReducer} from './userFoodsReducer';
import {userRecipesReducer} from './userRecipesReducer';
// import C from '../constants';

export default combineReducers({
  activePathRecipes: activePathRecipesReducer,
  auth: authReducer,
  dailyProgress: dailyProgressReducer,
  diets: dietsReducer,
  nutrients: nutrientsReducer,
  privacyPolicy: privacyPolicyReducer,
  recentlyConsumedFoods: recentlyConsumedFoodsReducer,
  termsAndConditions: termsAndConditionsReducer,
  user: userReducer,
  userFoods: userFoodsReducer,
  userRecipes: userRecipesReducer,
});

// const initialState = {};

// const rootReducer = (prevState = initialState, action) => {
//   // If action is matched, return a new state else return prevState.
//   if (action.type !== C.DESTROY_SESSION) {
//     return combineReducers({
//       activePathRecipes: activePathRecipesReducer,
//       auth: authReducer,
//       dailyProgress: dailyProgressReducer,
//       diets: dietsReducer,
//       nutrients: nutrientsReducer,
//       privacyPolicy: privacyPolicyReducer,
//       recentlyConsumedFoods: recentlyConsumedFoodsReducer,
//       termsAndConditions: termsAndConditionsReducer,
//       user: userReducer,
//       userFoods: userFoodsReducer,
//       userRecipes: userRecipesReducer,
//     });
//   } else {
//     return prevState;
//   }
// };
// export default rootReducer;
// // Combine all reducers.
// const appReducer = combineReducers({
//   state: (
//     state = {
//       activePathRecipes: activePathRecipesReducer,
//       auth: authReducer,
//       dailyProgress: dailyProgressReducer,
//       diets: dietsReducer,
//       nutrients: nutrientsReducer,
//       privacyPolicy: privacyPolicyReducer,
//       recentlyConsumedFoods: recentlyConsumedFoodsReducer,
//       termsAndConditions: termsAndConditionsReducer,
//       user: userReducer,
//       userFoods: userFoodsReducer,
//       userRecipes: userRecipesReducer,
//     },
//   ) => state,
// });
// const rootReducer = (state, action) => {
//   // Clear all data in redux store to initial.
//   if (action.type === C.DESTROY_SESSION) state = undefined;
//   return appReducer(state, action);
// };
// export default rootReducer;
