import { SET_ERROR } from '../types';

const initialState = '';

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return null;
    default:
      return state;
  }
};
