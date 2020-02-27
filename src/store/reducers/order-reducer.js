import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [], // {order: orderData, id: response.data.name}
  isLoading: false,
  isPurchased: false,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDERSTART:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.ORDEROK:
      const orderCopy = state.orders.concat({
        id: action.responseId,
        order: action.order
      });
      return {
        orders: orderCopy,
        isLoading: false,
        isPurchased: true,
      }
    case actionTypes.ORDERFAILED:
      return {
        ...state,
        isLoading: false,
      }
    case actionTypes.FETCHSTART:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.FETCHSUCCEEDED:
      return {
        ...state,
        orders: action.orders,
        isLoading: false,
      }
    case actionTypes.FETCHFAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default: return initialState;
  }
}

export default reducer;