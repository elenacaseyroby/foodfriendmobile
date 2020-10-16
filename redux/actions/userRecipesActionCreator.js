import C from '../constants';
import {buildOrRetrieveUserRecipesCache} from '../../asyncStorage/cache';

export function fetchUserRecipes(userId) {
  console.log('FETCH USER RECIPES');
  return async function (dispatch) {
    dispatch(fetchUserRecipesBegin());
    const userRecipes = await buildOrRetrieveUserRecipesCache(userId);
    if (!userRecipes) {
      const error = 'Could not fetch user recipes from db or cache.';
      return dispatch(fetchUserRecipesFailure(error));
    }
    return dispatch(fetchUserRecipesSuccess(userRecipes));
  };
}

export const fetchUserRecipesBegin = () => ({
  type: C.FETCH_USERRECIPES_BEGIN,
});

export const fetchUserRecipesSuccess = (userRecipes) => ({
  type: C.FETCH_USERRECIPES_SUCCESS,
  payload: {
    userRecipes: userRecipes,
  },
});

export const fetchUserRecipesFailure = (error) => ({
  type: C.FETCH_USERRECIPES_FAILURE,
  payload: {
    error: error,
  },
});
