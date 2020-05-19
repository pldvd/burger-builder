import authReducer from './auth-reducer';

describe('auth reducer', () => {

  it('returns the initial state if no arguments are passed', () => {
    const expectedState = {
      token: null,
      userId: null,
      isLoading: false,
      error: null,
    };

    expect(authReducer(undefined, {})).toEqual(expectedState)
  })

})
