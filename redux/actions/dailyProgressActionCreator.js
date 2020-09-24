import C from '../constants';
import {buildOrRetrieveDailyProgressCache} from '../../asyncStorage/cache';

export function fetchDailyProgress(userId) {
  console.log('FETCH DAILY PROGRESS');
  fetchDailyProgressBegin();
  return async function (dispatch) {
    dispatch(fetchDailyProgressBegin());
    const dailyProgress = await buildOrRetrieveDailyProgressCache(userId);
    if (!dailyProgress) {
      const error = 'Could not fetch daily progress from db or cache.';
      return dispatch(fetchDailyProgressFailure(error));
    }
    return dispatch(fetchDailyProgressSuccess(dailyProgress));
  };
}

export const fetchDailyProgressBegin = () => ({
  type: C.FETCH_DAILY_PROGRESS_BEGIN,
});

export const fetchDailyProgressSuccess = (dailyProgress) => ({
  type: C.FETCH_DAILY_PROGRESS_SUCCESS,
  payload: {
    dailyProgress: dailyProgress,
  },
});

export const fetchDailyProgressFailure = (error) => ({
  type: C.FETCH_DAILY_PROGRESS_FAILURE,
  payload: {
    error: error,
  },
});
