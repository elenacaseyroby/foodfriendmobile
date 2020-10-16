import C from '../constants';

const initialState = {
  userId: null,
};

export const authReducer = (prevState = initialState, action) => {
  // If action is matched, return a new state else return prevState.
  if (action.type === C.SET_AUTH) {
    return {
      userId: action.payload.userId,
    };
  } else if (action.type === C.DESTROY_SESSION) {
    return {};
  } else {
    return prevState;
  }
};
