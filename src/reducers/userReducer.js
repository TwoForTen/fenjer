import {
  USER_LOGIN,
  USER_LOGOUT,
  STORE_USER,
  STORE_PURCHASE,
  CLEAR_PURCHASE,
} from '../actions/actionTypes';

const initialState = {
  purchase: {},
  details: {},
  name: '',
  token: JSON.parse(localStorage.getItem('_jwt')) || '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER:
      return {
        ...state,
        name: action.payload.full_name,
        details: { ...action.payload },
      };
    case STORE_PURCHASE:
      return {
        ...state,
        purchase: {
          deliver_to: { ...action.payload.deliver_to },
          bill_to: { ...action.payload.bill_to },
        },
      };
    case CLEAR_PURCHASE:
      return {
        ...state,
        purchase: {},
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
        details: {},
        purchase: {},
      };
    default:
      return state;
  }
};
