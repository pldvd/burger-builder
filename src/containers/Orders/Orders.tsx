import React, { Component } from 'react';
import OrderCell from '../../components/Order/OrderCell/OrderCell';
import { OrdersInterface } from './types';
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/actions/index'
import { orderDataInterface } from '../Checkout/CheckoutForm/types';

class Orders extends Component<{ orders: OrdersInterface[], fetchOrdersFromServer: () => any }> {


  componentDidMount() {
    this.props.fetchOrdersFromServer();
  }

  render() {
    const allOrders = this.props.orders.map(order => {
      const { price, id, ingredients } = order;
      return <OrderCell price={price} ingredients={ingredients} id={id} key={id} />
    });

    return allOrders;
  }
}

const mapStateToProps = (state: any) => {
  return {
    orders: state.order.orders
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchOrdersFromServer: () => dispatch(fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);