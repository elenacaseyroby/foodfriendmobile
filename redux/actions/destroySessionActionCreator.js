import C from '../constants';

export function detroySession() {
  return async function (dispatch) {
    return dispatch({type: C.DESTROY_SESSION});
  };
}
