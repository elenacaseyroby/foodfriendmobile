import C from '../constants';

// login inspired by: https://daveceddia.com/where-fetch-data-redux/

const initialState = {
  error: null,
  loading: false,
  data: null,
};

export const userReducer = (prevState = initialState, action) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.FETCH_USER_BEGIN) {
    return {
      error: null,
      loading: true,
      data: prevState.data,
    };
  } else if (action.type === C.FETCH_USER_SUCCESS) {
    return {
      error: null,
      loading: false,
      data: action.payload.user,
    };
  } else if (action.type === C.FETCH_USER_FAILURE) {
    return {
      error: action.payload.error,
      loading: false,
      data: action.payload.user,
    };
  } else {
    return prevState;
  }
};
