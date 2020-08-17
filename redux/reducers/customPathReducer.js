import C from '../constants';

// login inspired by: https://daveceddia.com/where-fetch-data-redux/

const initialState = {
  error: null,
  loading: false,
  id: null,
  name: null,
  themeId: null,
};

export const customPathReducer = (prevState = initialState, action) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.FETCH_CUSTOM_PATH_BEGIN) {
    let newState = prevState;
    newState.error = null;
    newState.loading = true;
    return newState;
  } else if (action.type === C.FETCH_CUSTOM_PATH_SUCCESS) {
    return {
      error: null,
      loading: false,
      ...action.payload.customPath,
    };
  } else if (action.type === C.FETCH_CUSTOM_PATH_FAILURE) {
    let newState = prevState;
    newState.error = action.payload.error;
    newState.loading = false;
    return newState;
  } else {
    return prevState;
  }
};
