import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import WithErrorHandler from '../../hoc/WithErrorHandler';
import axios from '../../axios';
import Loader from '../../components/UI/Loader/Loader';
import { BurgerBuilderState, BurgerBuilderProps } from './types';
import { BurgerState } from '../../store/types';
import {changeAmount, cancel} from '../../store/actions/burger';
import { connect } from 'react-redux';


class BurgerBuilder extends Component<BurgerBuilderProps, BurgerBuilderState> {

  constructor(props: BurgerBuilderProps) {
    super(props);

    this.state = {
      isPurchasable: false,
      modalIsOpen: false,
      isLoading: false,
      hasError: false,
      httpErrorMsg: null
    }
  }

  componentDidUpdate(prevProps: BurgerBuilderProps, prevState: BurgerBuilderState) {
    if (prevProps.ingredients !== this.props.ingredients) {
      this.checkIfPurchasable(this.props.ingredients)
    }
  }

  checkIfPurchasable = (ingredients: { [key: string]: number }) => {
    const canPurchase = Object.values(ingredients).reduce((sum, currentVal) => sum + currentVal) > 0;

    this.setState({ isPurchasable: canPurchase });
  }

  setModalVisibility = () => {
    this.setState(prevState => (
      { modalIsOpen: !prevState.modalIsOpen }
    ));
  }

  continueOrder = () => {
    this.props.history.push('/checkout/checkout-form')
  }

  cancelOrder = () => {
    this.props.cancel();

    this.setState({
      modalIsOpen: false,
    })
  }

  render() {
    let burger = this.state.hasError ? <p>{`${this.state.httpErrorMsg}`}</p> : <Loader />;

    if (!this.state.isLoading) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BurgerControls
            ingredients={this.props.ingredients}
            changeAmount={this.props.changeAmount}
            price={this.props.finalPrice}
            canPurchase={this.state.isPurchasable}
            setVisibility={this.setModalVisibility} />
        </Fragment>
      )
    }

    return (
      <Fragment>
        <Modal isOpen={this.state.modalIsOpen} isLoading={this.state.isLoading} setVisibility={this.setModalVisibility}>
          <OrderSummary ingredients={this.props.ingredients}
            setVisibility={this.setModalVisibility}
            continueOrder={this.continueOrder}
            cancelOrder={this.cancelOrder}
            price={this.props.finalPrice}
            loading={this.state.isLoading}
          />
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = (state: BurgerState): BurgerState => {
  return {
    ingredients: state.ingredients,
    finalPrice: state.finalPrice
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeAmount: (lessOrMore: string,ingredient: string) => dispatch(changeAmount(lessOrMore, ingredient)),
    cancel: () => dispatch(cancel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));