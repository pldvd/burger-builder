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

  //maybe remove the need to pass around props.indegredients in the render method...
  render() {
    return (
      <div>
        <CheckoutSummary cancel={this.cancelOrder} continue={this.continueOrder} />
        <Route path={this.props.match.url + '/checkout-form'} render={() => <CheckoutForm />} />
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