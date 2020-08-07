import C from '../constants';
import {buildOrRetrievePrivacyPolicyCache} from '../../asyncStorage/cache';

export function fetchPrivacyPolicy() {
  console.log('FETCH PRIVACY POLICY');
  fetchPrivacyPolicyBegin();
  return async function (dispatch) {
    const privacyPolicy = await buildOrRetrievePrivacyPolicyCache();
    if (!privacyPolicy) {
      const error = 'Could not fetch privacy policy from db or cache.';
      return dispatch(fetchPrivacyPolicyFailure(error));
    }
    return dispatch(fetchPrivacyPolicySuccess(privacyPolicy));
  };
}

export const fetchPrivacyPolicyBegin = () => ({
  type: C.FETCH_PP_BEGIN,
});

export const fetchPrivacyPolicySuccess = (privacyPolicy) => ({
  type: C.FETCH_PP_SUCCESS,
  payload: {
    privacyPolicy: privacyPolicy,
  },
});

export const fetchPrivacyPolicyFailure = (error) => ({
  type: C.FETCH_PP_FAILURE,
  payload: {
    error: error,
  },
});
