import axios from 'axios';
import * as actionTypes from './actionTypes';
import jwtDecode from 'jwt-decode';

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
  localStorage.removeItem('authData');
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
        const { idToken } = response.data;
        localStorage.setItem('authData', JSON.stringify(response.data));
        console.log(response.data);
        dispatch(authSuccess(response.data));
        dispatch(checkTimeAndLogout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      })
  }
}

export const checkAuth = (data) => {
  const authData = JSON.parse(data);

  return dispatch => {
    if (authData) {
      const token = authData.idToken;
      const expiry = jwtDecode(token).exp; //seconds since Unix epoch
      const now = Date.now() / 1000; //need to divide by 1000 because this Date.now() measure time in miliseconds since Unix epoch
      console.log(expiry, now);
      if (expiry < now) {
        dispatch(logOut());
      } else if (expiry > now) {
        dispatch(authSuccess(authData))
      }
    }
  }
}
