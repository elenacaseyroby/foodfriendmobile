import C from '../constants';

const initialState = {
  error: null,
  loading: false,
  id: null,
  date_published: null,
  text: null,
};

export const termsAndConditionsReducer = (prevState = initialState, action) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.FETCH_TERMS_BEGIN) {
    return {
      error: null,
      loading: true,
      id: prevState.id,
      date_published: prevState.date_published,
      text: prevState.text,
    };
  } else if (action.type === C.FETCH_TERMS_SUCCESS) {
    return {
      error: null,
      loading: false,
      ...action.payload.termsAndConditions,
    };
  } else if (action.type === C.FETCH_TERMS_FAILURE) {
    return {
      error: action.payload.error,
      loading: false,
      id: prevState.id,
      date_published: prevState.date_published,
      text: prevState.text,
    };
  } else {
    return prevState;
  }
};
