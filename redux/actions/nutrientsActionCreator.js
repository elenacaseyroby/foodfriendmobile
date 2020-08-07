import C from '../constants';
import {buildOrRetrieveNutrientsCache} from '../../asyncStorage/cache';

export function fetchNutrients() {
  console.log('FETCH NUTRIENTS');
  fetchNutrientsBegin();
  return async function (dispatch) {
    const nutrients = await buildOrRetrieveNutrientsCache();
    if (!nutrients) {
      const error = 'Could not fetch nutrients from db or cache.';
      return dispatch(fetchNutrientsFailure(error));
    }
    return dispatch(fetchNutrientsSuccess(nutrients));
  };
}

export const fetchNutrientsBegin = () => ({
  type: C.FETCH_NUTRIENTS_BEGIN,
});

export const fetchNutrientsSuccess = (nutrients) => ({
  type: C.FETCH_NUTRIENTS_SUCCESS,
  payload: {
    nutrients: nutrients,
  },
});

export const fetchNutrientsFailure = (error) => ({
  type: C.FETCH_NUTRIENTS_FAILURE,
  payload: {
    error: error,
  },
});
