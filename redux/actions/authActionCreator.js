import C from '../constants';
import asyncStorage from '../../asyncStorage';

export function setAuth() {
  console.log('FETCH AUTH');
  return async function (dispatch) {
    const accessToken = await asyncStorage._retrieveData('ACCESS_TOKEN');
    const userId = await asyncStorage._retrieveData('USER_ID');
    console.log('~~~~~~~~~~');
    console.log(accessToken);
    console.log(userId);

    const loggedInUserId = accessToken && userId ? userId : null;
    console.log(loggedInUserId);
    return dispatch({
      type: C.SET_AUTH,
      payload: {
        userId: loggedInUserId,
      },
    });
  };
}
