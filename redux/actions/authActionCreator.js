import C from '../constants';
import asyncStorage from '../../asyncStorage';

export function setAuth() {
  console.log('FETCH AUTH');
  return async function (dispatch) {
    const accessToken = await asyncStorage._retrieveData('ACCESS_TOKEN');
    const userId = await asyncStorage._retrieveData('USER_ID');
    const loggedInUserId = accessToken && userId ? userId : null;
    return dispatch({
      type: C.SET_AUTH,
      payload: {
        userId: loggedInUserId,
      },
    });
  };
}
