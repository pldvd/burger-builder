import authReducer from './auth-reducer';
import { AUTH_START, AUTH_FAIL, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/';

describe('auth reducer', () => {

  const initialdState = {
    token: null,
    userId: null,
    isLoading: false,
    error: null,
  };

  it('returns the initial state if no arguments are passed', () => {
    expect(authReducer(undefined, {})).toEqual(initialdState);
    expect(authReducer(undefined, {}).token).toBeNull();
  })

  it('returns the right state for auth start', () => {
    const action = {
      type: AUTH_START
    };
    expect(authReducer(undefined, action)).toEqual({ ...initialdState, isLoading: true });
    expect(authReducer(undefined, action).isLoading).toBeTruthy();
  })

  it('returns the right state for auth success', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const userId = 1;
    const action = {
      type: AUTH_SUCCESS,
      authData: {
        idToken: token,
        localId: userId
      },
      isLoading: false
    };

    expect(authReducer(undefined, action)).toEqual({
      ...initialdState,
      token,
      userId,
      isLoading: false
    })
  })
})
