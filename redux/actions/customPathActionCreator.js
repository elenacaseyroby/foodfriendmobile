import C from '../constants';
import {buildOrRetrieveCustomPathCache} from '../../asyncStorage/cache';

export function fetchCustomPath(userId) {
  console.log('FETCH CUSTOM PATH');
  fetchCustomPathBegin();
  return async function (dispatch) {
    const customPath = await buildOrRetrieveCustomPathCache(userId);
    if (!customPath) {
      const error = 'Could not fetch custom path from db or cache.';
      return dispatch(fetchCustomPathFailure(error));
    }
    return dispatch(fetchCustomPathSuccess(customPath));
  };
}

export const fetchCustomPathBegin = () => ({
  type: C.FETCH_CUSTOM_PATH_BEGIN,
});

export const fetchCustomPathSuccess = (customPath) => ({
  type: C.FETCH_CUSTOM_PATH_SUCCESS,
  payload: {
    customPath: customPath,
  },
});

export const fetchCustomPathFailure = (error) => ({
  type: C.FETCH_CUSTOM_PATH_FAILURE,
  payload: {
    error: error,
  },
});
