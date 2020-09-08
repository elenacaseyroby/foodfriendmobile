import C from '../constants';
import {buildOrRetrieveRecommendedFoodsCache} from '../../asyncStorage/cache';

export function fetchRecommendedFoods(userId) {
  console.log('FETCH RECOMMENDED FOODS');
  fetchRecommendedFoodsBegin();
  return async function (dispatch) {
    const recommendedFoods = await buildOrRetrieveRecommendedFoodsCache(userId);
    if (!recommendedFoods) {
      const error = 'Could not fetch recommended foods from db or cache.';
      return dispatch(fetchRecommendedFoodsFailure(error));
    }
    return dispatch(fetchRecommendedFoodsSuccess(recommendedFoods));
  };
}

export const fetchRecommendedFoodsBegin = () => ({
  type: C.FETCH_RECOMMENDED_FOODS_BEGIN,
});

export const fetchRecommendedFoodsSuccess = (recommendedFoods) => ({
  type: C.FETCH_RECOMMENDED_FOODS_SUCCESS,
  payload: {
    recommendedFoods: recommendedFoods,
  },
});

export const fetchRecommendedFoodsFailure = (error) => ({
  type: C.FETCH_RECOMMENDED_FOODS_FAILURE,
  payload: {
    error: error,
  },
});
