import C from '../constants';
import {getRequest} from '../../services/apiUtils';

export function fetchDiets() {
  console.log('FETCH DIETS');
  fetchDietsBegin();
  return async function (dispatch) {
    const endpoint = '/diets';
    try {
      const diets = await getRequest(endpoint);
      if (diets.status !== 200) {
        const error = diets.response.message
          ? diets.response.message
          : JSON.stringify(diets.response);
        return dispatch(fetchDietsFailure(error));
      }
      return dispatch(fetchDietsSuccess(diets.response));
    } catch (error) {
      return dispatch(fetchDietsFailure(error));
    }
  };
}

export const fetchDietsBegin = () => ({
  type: C.FETCH_DIETS_BEGIN,
});

export const fetchDietsSuccess = (diets) => ({
  type: C.FETCH_DIETS_SUCCESS,
  payload: {
    diets: diets,
  },
});

export const fetchDietsFailure = (error) => ({
  type: C.FETCH_DIETS_FAILURE,
  payload: {
    error: error,
  },
});
