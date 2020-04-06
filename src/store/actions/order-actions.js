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

export const placeOrder = (order, token) => {
  return dispatch => {
    axios.post('/orders.json?auth=' + token, order)
      .then(response => dispatch(orderSuccess(order, response.data.name)))
      .catch(error => dispatch(orderFailed(error.msg)))
    //missing an error UI message here
  }
}

const fetchSuccess = (orders) => {
  return {
    type: actionTypes.FETCHSUCCEEDED,
    orders
  }
}

const fetchFail = (error) => {
  return {
    type: actionTypes.FETCHFAILED,
    error
  }
}

const fetchStart = () => {
  return {
    type: actionTypes.FETCHSTART
  }
}

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchStart());

    axios.get('/orders.json?auth=' + token)
      .then(response => {
        const fetchedOrders = [];

        for (let key in response.data) {
          //saving only the key, the ingredients and the price (not the customer info also coming back)
          const { ingredients, price } = response.data[key];
          fetchedOrders.push({
            ingredients,
            price,
            id: key
          });
        }
        return fetchedOrders;
      })
      .then((fetchedOrders) => dispatch(fetchSuccess(fetchedOrders)))
      .catch(err => dispatch(fetchFail(err)))
  }
}