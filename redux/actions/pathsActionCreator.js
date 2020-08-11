import C from '../constants';
import {buildOrRetrievePathsCache} from '../../asyncStorage/cache';

export function fetchPaths(userId) {
  console.log('FETCH PATHS');
  fetchPathsBegin();
  return async function (dispatch) {
    const paths = await buildOrRetrievePathsCache(userId);
    if (!paths) {
      const error = 'Could not fetch paths from db or cache.';
      return dispatch(fetchPathsFailure(error));
    }
    return dispatch(fetchPathsSuccess(paths));
  };
}

export const fetchPathsBegin = () => ({
  type: C.FETCH_PATHS_BEGIN,
});

export const fetchPathsSuccess = (paths) => ({
  type: C.FETCH_PATHS_SUCCESS,
  payload: {
    paths: paths,
  },
});

export const fetchPathsFailure = (error) => ({
  type: C.FETCH_PATHS_FAILURE,
  payload: {
    error: error,
  },
});
