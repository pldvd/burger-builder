import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps } from 'react-router-dom';
import { ingredientType } from '../../components/Burger/Burger';

class Checkout extends Component<RouteComponentProps> {

  continueOrder = () => {
    this.props.history.replace('/checkout/checkout-form')
  }

  cancelOrder = () => {
    this.props.history.goBack();
  }

  render() {
    const rawQuery = new URLSearchParams(this.props.location.search);
    
    const myIngreds: ingredientType = {
      salad: Number(rawQuery.get('salad')),
      cheese: Number(rawQuery.get('cheese')),
      bacon: Number(rawQuery.get('bacon')),
      meat: Number(rawQuery.get('meat'))
    }
    
    return (
      <div>
        <CheckoutSummary ingredients={myIngreds} cancel={this.cancelOrder} continue={this.continueOrder} />
      </div>
    )
  }
}

export default Checkout;