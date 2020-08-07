import C from '../constants';
import {buildOrRetrieveUserCache} from '../../asyncStorage/cache';

export function fetchUser(userId) {
  console.log('FETCH USER');
  fetchUserBegin();
  return async function (dispatch) {
    const user = await buildOrRetrieveUserCache(userId);
    if (!user) {
      const error = 'Could not fetch user from db or cache.';
      return dispatch(fetchUserFailure(error));
    }
    return dispatch(fetchUserSuccess(user));
  };
}

export const fetchUserBegin = () => ({
  type: C.FETCH_USER_BEGIN,
});

export const fetchUserSuccess = (user) => ({
  type: C.FETCH_USER_SUCCESS,
  payload: {
    user: user,
  },
});

export const fetchUserFailure = (error) => ({
  type: C.FETCH_USER_FAILURE,
  payload: {
    error: error,
  },
});
