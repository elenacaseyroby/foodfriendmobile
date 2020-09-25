import {fetchNutrients} from './actions/nutrientsActionCreator';
import {fetchDailyProgress} from './actions/dailyProgressActionCreator';
import {fetchDiets} from './actions/dietsActionCreator';
import {fetchUser} from './actions/userActionCreator';
import {fetchRecentlyConsumedFoods} from './actions/recentlyConsumedFoodsActionCreator';
import {fetchUserRecipes} from './actions/userRecipesActionCreator';
import {fetchActivePathRecipes} from './actions/activePathRecipesActionCreator';

export function fetchAllSignedInData(dispatch, userId) {
  dispatch(fetchDailyProgress(userId));
  dispatch(fetchUser(userId));
  dispatch(fetchNutrients());
  dispatch(fetchRecentlyConsumedFoods(userId));
  dispatch(fetchUserRecipes(userId));
  dispatch(fetchActivePathRecipes(userId));
  dispatch(fetchDiets());
  return 'success';
}
