import C from '../constants';
import {getRequest} from '../../services/apiUtils';

export function fetchTermsAndConditions() {
  console.log('FETCH TERMS');
  fetchTermsBegin();
  return async function (dispatch) {
    const endpoint = '/termsandconditions';
    try {
      const termsAndConditions = await getRequest(endpoint);
      if (termsAndConditions.status !== 200) {
        const error = termsAndConditions.response.message
          ? termsAndConditions.response.message
          : JSON.stringify(termsAndConditions.response);
        return dispatch(fetchTermsFailure(error));
      }
      return dispatch(fetchTermsSuccess(termsAndConditions.response));
    } catch (error) {
      return dispatch(fetchTermsFailure(error));
    }
  };
}

export const fetchTermsBegin = () => ({
  type: C.FETCH_TERMS_BEGIN,
});

export const fetchTermsSuccess = (termsAndConditions) => ({
  type: C.FETCH_TERMS_SUCCESS,
  payload: {
    termsAndConditions: termsAndConditions,
  },
});

export const fetchTermsFailure = (error) => ({
  type: C.FETCH_TERMS_FAILURE,
  payload: {
    error: error,
  },
});
