import { AUTH_START, AUTH_FAIL, AUTH_SUCCESS } from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.authData.idToken,
        userId: action.authData.userId,
        loading: false
      }
    case AUTH_FAIL:
      return {
        ...state,
        error: action.authData.error,
        loading: false
      }
    default:
      return state;
  }
}

export default authReducer;