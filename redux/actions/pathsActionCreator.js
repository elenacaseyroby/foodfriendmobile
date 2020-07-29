import C from '../constants';
import {getRequest} from '../../services/apiUtils';

export function fetchPaths() {
  console.log('FETCH PATHS');
  fetchPathsBegin();
  return async function (dispatch) {
    const endpoint = '/paths';
    try {
      const paths = await getRequest(endpoint);
      console.log(JSON.stringify(paths.response));
      if (paths.status !== 200) {
        const error = paths.response.message
          ? paths.response.message
          : JSON.stringify(paths.response);
        return dispatch(fetchPathsFailure(error));
      }
      return dispatch(fetchPathsSuccess(paths.response));
    } catch (error) {
      return dispatch(fetchPathsFailure(error));
    }
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
