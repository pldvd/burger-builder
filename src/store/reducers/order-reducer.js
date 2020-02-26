import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [], // {order: orderData, id: response.data.name}
  isLoading: false,
  isPurchased: false,
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
    default: return initialState;
  }
}

export default reducer;