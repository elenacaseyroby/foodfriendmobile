import C from '../constants';

const initialState = {
  error: null,
  loading: false,
  list: null,
};

export const recommendedFoodsReducer = (prevState = initialState, action) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.FETCH_RECOMMENDED_FOODS_BEGIN) {
    return {
      error: null,
      loading: true,
      list: prevState.list,
    };
  } else if (action.type === C.FETCH_RECOMMENDED_FOODS_SUCCESS) {
    return {
      error: null,
      loading: false,
      list: action.payload.recommendedFoods,
    };
  } else if (action.type === C.FETCH_RECOMMENDED_FOODS_FAILURE) {
    return {
      error: action.payload.error,
      loading: false,
      list: prevState.list,
    };
  } else {
    return prevState;
  }
};
