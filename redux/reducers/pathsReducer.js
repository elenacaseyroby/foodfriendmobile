import C from '../constants';

const initialState = {
  error: null,
  loading: false,
  list: null,
};

export const pathsReducer = (prevState = initialState, action) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.FETCH_PATHS_BEGIN) {
    return {
      error: null,
      loading: true,
      list: prevState.data,
    };
  } else if (action.type === C.FETCH_PATHS_SUCCESS) {
    return {
      error: null,
      loading: false,
      list: action.payload.diets,
    };
  } else if (action.type === C.FETCH_PATHS_FAILURE) {
    return {
      error: action.payload.error,
      loading: false,
      list: prevState.data,
    };
  } else {
    return prevState;
  }
};
