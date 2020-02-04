import React, { Component } from 'react';
import OrderCell from '../../components/Order/OrderCell/OrderCell';
import Axios from '../../axios';
import { Ingredients } from '../../components/BurgerControls/BurgerControls';

export interface OrdersInterface {
  ingredients: Ingredients,
  price: number,
  id: string,
}

class Orders extends Component<{}, { orders: OrdersInterface[] }> {

  state = {
    orders: [],
  }

  componentDidMount() {

    const orders: OrdersInterface[] = [];

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
      return <OrderCell price={price} ingredients={ingredients} id={id} key={id} />
    });

    return allOrders;
  }
}

export default Orders;