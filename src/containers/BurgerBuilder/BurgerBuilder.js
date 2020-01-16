import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios';

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0,
      },
      finalPrice: 4,
      isPurchasable: false,
      modalIsOpen: false,
      isLoading: false
    }

    this.IngredientPriceList = {
      salad: .5,
      cheese: 1,
      bacon: 1,
      meat: 2,
    }
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
    }, console.log('isLoading set true'))

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
        modalIsOpen:false,
      });
    })
    .catch(error => {
      console.log(error);
      this.setState({
        isLoading: false,
        modalIsOpen:false,
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
    return (
      <Fragment>
        <Modal isOpen={this.state.modalIsOpen} isLoading={this.state.isLoading} setVisibility={this.setModalVisibility}>
          <OrderSummary ingredients={this.state.ingredients}
            setVisibility={this.setModalVisibility}
            continueOrder={this.continueOrder}
            cancelOrder={this.cancelOrder}
            price={this.state.finalPrice}
            loading={this.state.isLoading}
          />
        </Modal>
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
}

export default BurgerBuilder;