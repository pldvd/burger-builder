import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const orderStartLoading = () => {
  return {
    type: actionTypes.ORDERSTART,
  }
}

const orderSuccess = (order, responseId) => {
  return {
    type: actionTypes.ORDEROK,
    order,
    responseId,
  }
}

const orderFailed = (errorMsg) => {
  return {
    type: actionTypes.ORDERFAILED,
    errorMsg,
  }
}

export const placeOrder = (order, clearFunc) => {
  return dispatch => {
    axios.post('/orders.json', order)
      .then(response => dispatch(orderSuccess(order, response.data.name)))
      .catch(error => dispatch(orderFailed(error.msg)))
    //missing an error UI message here
  }
}