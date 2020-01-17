import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import WithErrorHandler from '../../hoc/WithErrorHandler';
import axios from '../../axios';
import Loader from '../../components/UI/Loader/Loader';

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ingredients: null,
      finalPrice: 4,
      isPurchasable: false,
      modalIsOpen: false,
      isLoading: false,
      hasError: false,
      httpErrorMsg: null
    }

    this.IngredientPriceList = {
      salad: .5,
      cheese: 1,
      bacon: 1,
      meat: 2,
    }
  }

  componentDidMount() {
    axios.get('https://react-burger-builder-8ee58.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data })
      })
      .catch(err => {
        this.setState({ hasError: true, httpErrorMsg: this.props.httpError });
      })
  }

  changeAmount = (lessOrMore, ingredient) => {
    if (lessOrMore === 'less') {
      this.setState(prevState => {
        return {
          ingredients: {
            ...prevState.ingredients,
            [ingredient]: prevState.ingredients[ingredient] - 1,
          },
          finalPrice: prevState.finalPrice - this.IngredientPriceList[ingredient],
        }
      }, () => this.checkIfPurchasable(this.state.ingredients)
      );
    } else if (lessOrMore === 'more') {
      this.setState(prevState => {
        return {
          ingredients: {
            ...prevState.ingredients,
            [ingredient]: prevState.ingredients[ingredient] + 1,
          },
          finalPrice: prevState.finalPrice + this.IngredientPriceList[ingredient],
        }
      }, () => this.checkIfPurchasable(this.state.ingredients)
      );
    }
  }

  //This will be added as a second parameter/callback to setState - this makes sure it runs once the state shows latest ingredients object
  checkIfPurchasable = (ingredients) => {
    const canPurchase = Object.values(ingredients).reduce((sum, currentVal) => sum + currentVal) > 0;

    this.setState({ isPurchasable: canPurchase });
  }

  setModalVisibility = () => {
    this.setState(prevState => (
      { modalIsOpen: !prevState.modalIsOpen }
    ));
  }

  continueOrder = () => {

    this.setState({
      isLoading: true
    })

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.finalPrice,
      customer: {
        name: 'Peter Pan',
        address: {
          street: 'Wendy str. 23',
          city: 'Fairy',
          country: 'Neverland'
        }
      }
    }

    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({
          isLoading: false,
          modalIsOpen: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false,
          modalIsOpen: false,
        })
      });
  }

  cancelOrder = () => {
    this.setState({
      ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0,
      },
      finalPrice: 4,
      isPurchasable: false,
      modalIsOpen: false,
    })
  }

  render() {
    let burger = this.state.hasError ? <p>{`${this.state.httpErrorMsg}`}</p> : <Loader />;

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            ingredients={this.state.ingredients}
            changeAmount={this.changeAmount}
            price={this.state.finalPrice}
            canPurchase={this.state.isPurchasable}
            setVisibility={this.setModalVisibility} />
        </Fragment>
      )
    }

    return (
      <Fragment>
        <Modal isOpen={this.state.modalIsOpen} isLoading={this.state.isLoading} setVisibility={this.setModalVisibility}>
          <OrderSummary ingredients={this.state.ingredients || {}}
            setVisibility={this.setModalVisibility}
            continueOrder={this.continueOrder}
            cancelOrder={this.cancelOrder}
            price={this.state.finalPrice}
            loading={this.state.isLoading}
          />
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

export default WithErrorHandler(BurgerBuilder, axios);