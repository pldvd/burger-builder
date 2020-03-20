import { AUTH_START, AUTH_FAIL, AUTH_SUCCESS } from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  isLoading: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        isLoading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.authData.idToken,
        userId: action.authData.localId,
        isLoading: false
      }
    case AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state;
  }
}

export default authReducer;