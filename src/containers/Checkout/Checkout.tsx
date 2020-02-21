import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { RouteComponentProps } from 'react-router-dom';
import { BurgerState } from '../../store/reducers/types'
import { connect } from 'react-redux';

interface CheckoutProps extends BurgerState, RouteComponentProps {}

class Checkout extends Component<CheckoutProps> {

  continueOrder = () => {
    this.props.history.replace('/checkout/checkout-form')
  }

  cancelOrder = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ingredients} cancel={this.cancelOrder} continue={this.continueOrder} />
        <Route path={this.props.match.url + '/checkout-form'} render={() => <CheckoutForm ingredients={this.props.ingredients} finalPrice={this.props.finalPrice} />} />
      </div>
    )
  }
}

const mapStateToProps = (state: BurgerState) => {
  return {
    ingredients: state.ingredients,
    finalPrice: state.finalPrice
  }
}

export default connect(mapStateToProps)(Checkout);