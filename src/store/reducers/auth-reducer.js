import {AUTH_START, AUTH_FAIL, AUTH_SUCCESS} from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  // switch (action.type) {
  //   case 
  // }
}

export default authReducer;