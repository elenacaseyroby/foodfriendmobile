import C from '../constants';

const initialState = {
  userId: null,
};

export const authReducer = (prevState = initialState, action) => {
  console.log('REDUCE AUTH');
  // If action is matched, return a new state else return prevState.
  if (action.type === C.SET_AUTH) {
    return {
      userId: action.payload.userId,
    };
  } else {
    return prevState;
  }
};
