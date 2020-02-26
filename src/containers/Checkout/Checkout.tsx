import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { BurgerState } from '../../store/types'
import { connect } from 'react-redux';
import { IngredientType } from '../../components/Burger/Burger';

interface CheckoutProps extends BurgerState, RouteComponentProps {
  isPurchased: boolean
}

class Checkout extends Component<CheckoutProps> {

  continueOrder = () => {
    this.props.history.replace('/checkout/checkout-form')
  }

  // cancelOrder = () => {
  //   this.props.history.goBack();
  // }

  render() {
    let summary = (
      <div>
        <CheckoutSummary continue={this.continueOrder} />
        <Route path={this.props.match.url + '/checkout-form'} component={CheckoutForm} />
      </div>
    );

    const isTheBurgerEmpty = (ingredients: IngredientType) => {
      const ingredientValues = Object.values(ingredients).every(ing => !ing)
      return ingredientValues;
    }

    // console.log(isTheBurgerEmpty(this.props.ingredients));

    (this.props.isPurchased || isTheBurgerEmpty(this.props.ingredients)) && (summary = <Redirect to='/' />);

    return summary;
    // (
    //   <div>
    //     <CheckoutSummary cancel={this.cancelOrder} continue={this.continueOrder} />
    //     <Route path={this.props.match.url + '/checkout-form'} component={CheckoutForm} />
    //   </div>
    // )
  }
}

const mapStateToProps = (state: any) => {
  return {
    ingredients: state.burger.ingredients,
    isPurchased: state.order.isPurchased,
  }
}

export default connect(mapStateToProps)(Checkout);