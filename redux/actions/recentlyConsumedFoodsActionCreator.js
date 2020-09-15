import C from '../constants';
import {buildOrRetrieveRecentlyConsumedFoodsCache} from '../../asyncStorage/cache';

export function fetchRecentlyConsumedFoods(userId) {
  console.log('FETCH RECENTLY CONSUMED FOODS');
  fetchRecentlyConsumedFoodsBegin();
  return async function (dispatch) {
    const recentlyConsumedFoods = await buildOrRetrieveRecentlyConsumedFoodsCache(
      userId,
    );
    console.log(recentlyConsumedFoods);
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
