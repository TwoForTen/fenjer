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
  token: JSON.parse(localStorage.getItem('_jwt')) || '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER:
      return {
        ...state,
        details: { ...state.details, ...action.payload },
      };
    case STORE_PURCHASE:
      return {
        ...state,
        purchase: {
          delivery_info: { ...action.payload.delivery_info },
          bill_info: { ...action.payload.bill_info },
          note: action.payload.note,
          billCheckbox: action.payload.billCheckbox,
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
      };
    case USER_LOGOUT:
      return {
        token: '',
        details: {},
        purchase: {},
      };
    default:
      return state;
  }
};
