import C from '../constants';
import {buildOrRetrieveUserFoodsCache} from '../../asyncStorage/cache';

export function fetchUserFoods(userId) {
  console.log('FETCH USERFOODS');
  return async function (dispatch) {
    dispatch(fetchUserFoodsBegin());
    const userFoods = await buildOrRetrieveUserFoodsCache(userId);
    if (!userFoods) {
      const error = 'Could not fetch userfoods from db or cache.';
      return dispatch(fetchUserFoodsFailure(error));
    }
    return dispatch(fetchUserFoodsSuccess(userFoods));
  };
}

export const fetchUserFoodsBegin = () => ({
  type: C.FETCH_USERFOODS_BEGIN,
});

export const fetchUserFoodsSuccess = (userFoods) => ({
  type: C.FETCH_USERFOODS_SUCCESS,
  payload: {
    userFoods: userFoods,
  },
});

export const fetchUserFoodsFailure = (error) => ({
  type: C.FETCH_USERFOODS_FAILURE,
  payload: {
    error: error,
  },
});
