import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutForm from './CheckoutForm/CheckoutForm';
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
        <Route path={this.props.match.url + '/checkout-form'} component={CheckoutForm}/>
      </div>
    )
  }
}

export default Checkout;