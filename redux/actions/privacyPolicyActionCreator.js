import C from '../constants';
import {getRequest} from '../../services/apiUtils';

export function fetchPrivacyPolicy() {
  console.log('FETCH PRIVACY POLICY');
  fetchPPBegin();
  return async function (dispatch) {
    const endpoint = '/privacypolicy';
    try {
      const privacyPolicy = await getRequest(endpoint);
      if (privacyPolicy.status !== 200) {
        const error = privacyPolicy.response.message
          ? privacyPolicy.response.message
          : JSON.stringify(privacyPolicy.response);
        return dispatch(fetchPPFailure(error));
      }
      return dispatch(fetchPPSuccess(privacyPolicy.response));
    } catch (error) {
      return dispatch(fetchPPFailure(error));
    }
  };
}

export const fetchPPBegin = () => ({
  type: C.FETCH_PP_BEGIN,
});

export const fetchPPSuccess = (privacyPolicy) => ({
  type: C.FETCH_PP_SUCCESS,
  payload: {
    privacyPolicy: privacyPolicy,
  },
});

export const fetchPPFailure = (error) => ({
  type: C.FETCH_PP_FAILURE,
  payload: {
    error: error,
  },
});
