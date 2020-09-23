import C from '../constants';
import {buildOrRetrieveActivePathRecipesCache} from '../../asyncStorage/cache';

export function fetchActivePathRecipes(userId) {
  console.log('FETCH ACTIVEPATH RECIPES');
  fetchActivePathRecipesBegin();
  return async function (dispatch) {
    const activePathRecipes = await buildOrRetrieveActivePathRecipesCache(
      userId,
    );
    if (!activePathRecipes) {
      const error = 'Could not fetch activePath recipes from db or cache.';
      return dispatch(fetchActivePathRecipesFailure(error));
    }
    return dispatch(fetchActivePathRecipesSuccess(activePathRecipes));
  };
}

export const fetchActivePathRecipesBegin = () => ({
  type: C.FETCH_ACTIVEPATH_RECIPES_BEGIN,
});

export const fetchActivePathRecipesSuccess = (activePathRecipes) => ({
  type: C.FETCH_ACTIVEPATH_RECIPES_SUCCESS,
  payload: {
    activePathRecipes: activePathRecipes,
  },
});

export const fetchActivePathRecipesFailure = (error) => ({
  type: C.FETCH_ACTIVEPATH_RECIPES_FAILURE,
  payload: {
    error: error,
  },
});
