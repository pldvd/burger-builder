import React, { Component } from 'react';
import OrderCell from '../../components/Order/OrderCell/OrderCell';
import { OrdersProps } from './types';
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/actions/index';
import WithErrorHandler from '../../hoc/WithErrorHandler';
import axios from '../../axios';
// import { orderDataInterface } from '../Checkout/CheckoutForm/types';

class Orders extends Component<{ orders: OrdersProps[], fetchOrdersFromServer: (token: string) => any, token: string }> {


  componentDidMount() {
    this.props.fetchOrdersFromServer(this.props.token);
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
    orders: state.order.orders,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchOrdersFromServer: (token: string) => dispatch(fetchOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));