import C from '../constants';

const API_HOST = 'http://localhost:5000';

export function fetchUserDetails(userId, accessToken) {
  fetchUserDetailsBegin();
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
          return dispatch(fetchUserDetailsFailure(res.response.message));
        dispatch(fetchUserDetailsSuccess(res.response));
      })
      .catch((error) => dispatch(fetchUserDetailsFailure(error)));
  };
}

export const fetchUserDetailsBegin = () => ({
  type: C.FETCH_USER_DETAILS_BEGIN,
});

export const fetchUserDetailsSuccess = (user) => ({
  type: C.FETCH_USER_DETAILS_SUCCESS,
  payload: {user},
});

export const fetchUserDetailsFailure = (error) => ({
  type: C.FETCH_USER_DETAILS_FAILURE,
  payload: {error},
});
