import C from '../constants';

const initialState = {
  error: null,
  loading: false,
  list: null,
};

export const activePathRecipesReducer = (prevState = initialState, action) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.FETCH_ACTIVEPATH_RECIPES_BEGIN) {
    return {
      error: null,
      loading: true,
      list: prevState.list,
    };
  } else if (action.type === C.FETCH_ACTIVEPATH_RECIPES_SUCCESS) {
    return {
      error: null,
      loading: false,
      list: action.payload.activePathRecipes,
    };
  } else if (action.type === C.FETCH_ACTIVEPATH_RECIPES_FAILURE) {
    return {
      error: action.payload.error,
      loading: false,
      list: prevState.list,
    };
  } else {
    return prevState;
  }
};
