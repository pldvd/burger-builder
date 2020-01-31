import React, { Component } from 'react';
import OrderCell from '../../components/Order/OrderCell/OrderCell';
import Axios from '../../axios';

class Orders extends Component {

  state = {
    orders: [],
  }

  componentDidMount() {

    const orders = [];

    Axios.get('/orders.json')
      .then(response => {
        for (let key in response.data) {
          //saving only the key, the ingredients and the price (not the customer info also coming back)
          const { ingredients, price } = response.data[key];
          orders.push({
            ingredients,
            price,
            id: key
          });
        }
      })
      .then(() => {
        this.setState({ orders: orders })
      });
  }

  render() {
    const allOrders = this.state.orders.map(order => {
      const { price, id, ingredients } = order;
      return <OrderCell price={price} ingredients={ingredients} key={id} />
    });
    return allOrders;
  }
}

export default Orders;