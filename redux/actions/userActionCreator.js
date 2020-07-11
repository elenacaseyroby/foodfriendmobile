import C from '../constants';
import {getRequest} from '../../services/apiUtils';

export function fetchUser(userId) {
  console.log('FETCH USER');
  fetchUserBegin();
  return async function (dispatch) {
    const endpoint = `/users/${userId}`;
    try {
      const res = await getRequest(endpoint);
      if (res.status !== 200) {
        const error = res.response.contains('message')
          ? res.response.message
          : JSON.stringify(res.response);
        return dispatch(fetchUserFailure(error));
      }
      return dispatch(fetchUserSuccess(res.response));
    } catch (error) {
      return dispatch(fetchUserFailure(error));
    }
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
