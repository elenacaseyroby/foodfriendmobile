import C from '../constants';
import {getRequest} from '../../services/apiUtils';

export function fetchNutrients() {
  console.log('FETCH NUTRIENTS');
  fetchNutrientsBegin();
  return async function (dispatch) {
    const endpoint = '/nutrients';
    try {
      const nutrients = await getRequest(endpoint);
      if (nutrients.status !== 200) {
        const error = nutrients.response.message
          ? nutrients.response.message
          : JSON.stringify(nutrients.response);
        return dispatch(fetchNutrientsFailure(error));
      }
      return dispatch(fetchNutrientsSuccess(nutrients.response));
    } catch (error) {
      return dispatch(fetchNutrientsFailure(error));
    }
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
