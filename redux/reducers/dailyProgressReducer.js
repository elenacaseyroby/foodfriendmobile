import C from '../constants';

// login inspired by: https://daveceddia.com/where-fetch-data-redux/

const initialState = {
  error: null,
  loading: false,
  nutrientsTotalDvConsumed: null,
};

export const dailyProgressReducer = (prevState = initialState, action) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.FETCH_DAILY_PROGRESS_BEGIN) {
    let newState = prevState;
    newState.error = null;
    newState.loading = true;
    return newState;
  } else if (action.type === C.FETCH_DAILY_PROGRESS_SUCCESS) {
    return {
      error: null,
      loading: false,
      ...action.payload.dailyProgress,
    };
  } else if (action.type === C.FETCH_DAILY_PROGRESS_FAILURE) {
    let newState = prevState;
    newState.error = action.payload.error;
    newState.loading = false;
    return newState;
  } else if (action.type === C.DESTROY_SESSION) {
    return {};
  } else {
    return prevState;
  }
};
