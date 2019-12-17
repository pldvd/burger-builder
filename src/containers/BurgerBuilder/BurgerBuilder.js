import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ingredients: {
        salad: 1,
        cheese: 1,
        bacon: 1,
        meat: 1,
      }
    }
  }

  changeAmount = (lessOrMore, ingredient) => {
    if (lessOrMore === 'less') {
      this.setState(prevState => ({
        ingredients: {
          ...prevState.ingredients,
          [ingredient]: prevState.ingredients[ingredient] - 1,
        }
      })
      );
    } else if (lessOrMore === 'more') {
      this.setState(prevState => ({
        ingredients: {
          ...prevState.ingredients,
          [ingredient]: prevState.ingredients[ingredient] + 1,
        }
      })
      );
    }
  }

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls ingredients={this.state.ingredients} changeAmount={this.changeAmount} />
      </Fragment>
    )
  }
}

export default BurgerBuilder;