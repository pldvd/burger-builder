import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { RouteComponentProps } from 'react-router-dom';
import { IngredientType } from '../../components/Burger/Burger';

class Checkout extends Component<RouteComponentProps, { ingredients: IngredientType, finalPrice: number | null }> {

  state = {
    ingredients: {} as IngredientType,
    finalPrice: null,
  };

  continueOrder = () => {
    this.props.history.replace('/checkout/checkout-form')
  }

  cancelOrder = () => {
    this.props.history.goBack();
  }


  // shouldComponentUpdate(nextProps: RouteComponentProps, nextState: ingredientType): boolean {
  //   if (nextProps.location.search !== this.props.location.search) {
  //     return false;
  //   }

  //   return true;
  // }

  componentDidMount() {

    const rawQuery = new URLSearchParams(this.props.location.search);

    const myIngreds: IngredientType = {
      salad: Number(rawQuery.get('salad')),
      cheese: Number(rawQuery.get('cheese')),
      bacon: Number(rawQuery.get('bacon')),
      meat: Number(rawQuery.get('meat'))
    }

    const finalPrice: number = Number(rawQuery.get('price'))

    this.setState({ ingredients: { ...myIngreds }, finalPrice: finalPrice });
  }

  render() {

    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} cancel={this.cancelOrder} continue={this.continueOrder} />
        <Route path={this.props.match.url + '/checkout-form'} render={(props) => <CheckoutForm ingredients={this.state.ingredients} finalPrice={this.state.finalPrice} />} />
      </div>
    )
  }
}

export default Checkout;