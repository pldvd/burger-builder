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
      this.setState(prevState => ({
        ingredients: {
          ...prevState.ingredients,
          [ingredient]: prevState.ingredients[ingredient] - 1,
        },
        finalPrice: prevState.finalPrice > 4 ? prevState.finalPrice - this.IngredientPriceList[ingredient] : prevState.finalPrice,
      })
      );
    } else if (lessOrMore === 'more') {
      this.setState(prevState => ({
        ingredients: {
          ...prevState.ingredients,
          [ingredient]: prevState.ingredients[ingredient] + 1,
        },
        finalPrice: prevState.finalPrice + this.IngredientPriceList[ingredient],
      })
      );
    }
  }

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          ingredients={this.state.ingredients}
          changeAmount={this.changeAmount} 
          price={this.state.finalPrice}/>
      </Fragment>
    )
  }
}

export default BurgerBuilder;