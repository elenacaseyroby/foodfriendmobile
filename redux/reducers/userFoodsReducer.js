import C from '../constants';

const initialState = {
  error: null,
  loading: false,
  list: null,
};

export const userFoodsReducer = (prevState = initialState, action) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.FETCH_USERFOODS_BEGIN) {
    return {
      error: null,
      loading: true,
      list: prevState.list,
    };
  } else if (action.type === C.FETCH_USERFOODS_SUCCESS) {
    return {
      error: null,
      loading: false,
      list: action.payload.userFoods,
    };
  } else if (action.type === C.FETCH_USERFOODS_FAILURE) {
    return {
      error: action.payload.error,
      loading: false,
      list: prevState.list,
    };
  } else if (action.type === C.DESTROY_SESSION) {
    return {};
  } else {
    return prevState;
  }
};
