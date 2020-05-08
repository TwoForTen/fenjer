import { USER_LOGIN, USER_LOGOUT, STORE_USER } from '../actions/actionTypes';

const initialState = {
  userDetails: {},
  name: '',
  token: JSON.parse(localStorage.getItem('_jwt')) || '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER:
      return {
        ...state,
        name: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.access_token,
        name: action.payload.user.name,
      };
    case USER_LOGOUT:
      return {
        ...state,
        token: '',
        name: '',
        userDetails: {},
      };
    default:
      return state;
  }
};
