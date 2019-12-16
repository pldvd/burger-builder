import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import burgerControls from '../../components/BurgerControls/BurgerControls';

class BurgerBuilder extends Component {
state = {
  ingredients: {
    salad: 1,
    cheese: 1,
    bacon: 1,
    meat: 1,
  }
}

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BurgerControls />
      </Fragment>
    )
  }
}

export default BurgerBuilder;