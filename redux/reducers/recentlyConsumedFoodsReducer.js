import C from '../constants';

const initialState = {
  error: null,
  loading: false,
  list: null,
};

export const recentlyConsumedFoodsReducer = (
  prevState = initialState,
  action,
) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.FETCH_RECENTLY_CONSUMED_FOODS_BEGIN) {
    return {
      error: null,
      loading: true,
      list: prevState.list,
    };
  } else if (action.type === C.FETCH_RECENTLY_CONSUMED_FOODS_SUCCESS) {
    return {
      error: null,
      loading: false,
      list: action.payload.recentlyConsumedFoodss,
    };
  } else if (action.type === C.FETCH_RECENTLY_CONSUMED_FOODS_FAILURE) {
    return {
      error: action.payload.error,
      loading: false,
      list: prevState.list,
    };
  } else {
    return prevState;
  }
};
