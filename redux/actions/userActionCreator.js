import C from '../constants';

const API_HOST = 'http://localhost:5000';

export function fetchUser(userId, accessToken) {
  fetchUserBegin();
  return async function (dispatch) {
    return await fetch(`${API_HOST}/users/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
      .then(async (res) => {
        if (res.status !== 200)
          return dispatch(fetchUserFailure(res.response.message));
        dispatch(fetchUserSuccess(res.response));
        return res.response;
      })
      .catch((error) => dispatch(fetchUserFailure(error)));
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
