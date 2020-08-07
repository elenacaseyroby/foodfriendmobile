import C from '../constants';
import {buildOrRetrieveTermsCache} from '../../asyncStorage/cache';

export function fetchTermsAndConditions() {
  console.log('FETCH TERMS');
  fetchTermsBegin();
  return async function (dispatch) {
    const terms = await buildOrRetrieveTermsCache();
    if (!terms) {
      const error = 'Could not fetch terms and conditions from db or cache.';
      return dispatch(fetchTermsFailure(error));
    }
    return dispatch(fetchTermsSuccess(terms));
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
