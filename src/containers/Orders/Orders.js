import React, { Component } from 'react';
import OrderCell from '../../components/Order/OrderCell/OrderCell';

class Orders extends Component {

  state = {
    ingredients: {
      bacon: 0,
      meat: 1,
      salad: 2,
      cheese: 1
    }
  }

  render() {
    return <OrderCell price='8.00' ingredients={this.state.ingredients}/>
  }
}

export default Orders;