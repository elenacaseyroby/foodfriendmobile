import C from '../constants';
import {buildOrRetrieveRecentlyConsumedFoodsCache} from '../../asyncStorage/cache';

export function fetchRecentlyConsumedFoods(userId) {
  console.log('FETCH RECENTLY CONSUMED FOODS');
  return async function (dispatch) {
    dispatch(fetchRecentlyConsumedFoodsBegin());
    const recentlyConsumedFoods = await buildOrRetrieveRecentlyConsumedFoodsCache(
      userId,
    );
    if (!recentlyConsumedFoods) {
      const error = 'Could not fetch recommended foods from db or cache.';
      return dispatch(fetchRecentlyConsumedFoodsFailure(error));
    }
    return dispatch(fetchRecentlyConsumedFoodsSuccess(recentlyConsumedFoods));
  };
}

export const fetchRecentlyConsumedFoodsBegin = () => ({
  type: C.FETCH_RECENTLY_CONSUMED_FOODS_BEGIN,
});

export const fetchRecentlyConsumedFoodsSuccess = (recentlyConsumedFoods) => ({
  type: C.FETCH_RECENTLY_CONSUMED_FOODS_SUCCESS,
  payload: {
    recentlyConsumedFoods: recentlyConsumedFoods,
  },
});

export const fetchRecentlyConsumedFoodsFailure = (error) => ({
  type: C.FETCH_RECENTLY_CONSUMED_FOODS_FAILURE,
  payload: {
    error: error,
  },
});
