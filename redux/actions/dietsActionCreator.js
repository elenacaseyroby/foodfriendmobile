import C from '../constants';
import {buildOrRetrieveDietsCache} from '../../asyncStorage/cache';

export function fetchDiets() {
  console.log('FETCH DIETS');
  return async function (dispatch) {
    dispatch(fetchDietsBegin());
    const diets = await buildOrRetrieveDietsCache();
    if (!diets) {
      const error = 'Could not fetch diets from db or cache.';
      return dispatch(fetchDietsFailure(error));
    }
    return dispatch(fetchDietsSuccess(diets));
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
