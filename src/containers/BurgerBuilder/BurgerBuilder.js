import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';

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

    this.setState({isPurchasable: canPurchase});
  }

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          ingredients={this.state.ingredients}
          changeAmount={this.changeAmount}
          price={this.state.finalPrice}
          canPurchase={this.state.isPurchasable} />
      </Fragment>
    )
  }
}

export default BurgerBuilder;