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
import { changeAmount, cancel, init } from '../../store/actions/index';
import { connect } from 'react-redux';


class BurgerBuilder extends Component<BurgerBuilderProps, BurgerBuilderState> {

  constructor(props: BurgerBuilderProps) {
    super(props);

    this.state = {
      isPurchasable: false,
      modalIsOpen: false,
    }
  }

  componentDidMount() {
    if (this.props.isPurchased) {
      this.props.cancel(); //clear orders at every DidMount if the burger was purchased, otherwise do nothing
    }
    this.props.init(); //initialize ingredients from redux store (if anything exists there, use it)
    this.checkIfPurchasable(this.props.ingredients); //check if there are orders, to enable purchase button
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
    let burger = this.props.hasError ? <p>{`${this.props.errorMsg}`}</p> : <Loader />;

    if (!this.props.isLoading) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BurgerControls
            ingredients={this.props.ingredients}
            changeAmount={this.props.changeAmount}
            price={this.props.finalPrice}
            canPurchase={this.state.isPurchasable}
            setVisibility={this.setModalVisibility}
            hasToken={this.props.token} />
        </Fragment>
      )
    }

    return (
      <Fragment>
        <Modal isOpen={this.state.modalIsOpen} isLoading={this.props.isLoading} setVisibility={this.setModalVisibility}>
          <OrderSummary ingredients={this.props.ingredients}
            setVisibility={this.setModalVisibility}
            continueOrder={this.continueOrder}
            cancelOrder={this.cancelOrder}
            price={this.props.finalPrice}
            loading={this.props.isLoading}
          />
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    ingredients: state.burger.ingredients,
    finalPrice: state.burger.finalPrice,
    isLoading: state.burger.isLoading,
    hasError: state.burger.hasError,
    errorMsg: state.burger.errorMsg,
    token: !!state.auth.token,
    isPurchased: state.order.isPurchased
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeAmount: (lessOrMore: string, ingredient: string) => dispatch(changeAmount(lessOrMore, ingredient)),
    cancel: () => dispatch(cancel()),
    init: () => dispatch(init())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));