import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiresIn');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}


export const checkTimeAndLogout = (time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, time * 1000)
  }
}


export const auth = (email, password, isSignedUp) => {
  const authVariable = isSignedUp ? 'signInWithPassword' : 'signUp';

  return dispatch => {
    dispatch(authStart())
    axios({
      method: 'post',
      url: `https://identitytoolkit.googleapis.com/v1/accounts:${authVariable}?key=${process.env.REACT_APP_KEY}`,
      data: {
        email,
        password,
        returnSecureToken: true
      }
    })
      .then(response => {
        const { idToken, expiresIn } = response.data;
        localStorage.setItem('token', idToken);
        console.log(response.data);
        dispatch(authSuccess(response.data));
        dispatch(checkTimeAndLogout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      })
  }
}

export const checkAuth = (token, expiry) => {
  
  return dispatch => {
    //success => logIn
    //failure => logOut
  }
}
