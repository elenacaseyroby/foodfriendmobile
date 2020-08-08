import C from '../constants';

const initialState = {
  error: null,
  loading: false,
  list: null,
};

export const dietsReducer = (prevState = initialState, action) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.FETCH_DIETS_BEGIN) {
    return {
      error: null,
      loading: true,
      list: prevState.list,
    };
  } else if (action.type === C.FETCH_DIETS_SUCCESS) {
    return {
      error: null,
      loading: false,
      list: action.payload.diets,
    };
  } else if (action.type === C.FETCH_DIETS_FAILURE) {
    return {
      error: action.payload.error,
      loading: false,
      list: prevState.list,
    };
  } else {
    return prevState;
  }
};
