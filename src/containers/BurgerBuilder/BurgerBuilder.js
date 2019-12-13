import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
state = {
  ingredients: {
    salad: 2,
    cheese: 1,
    bacon: 1,
    meat: 4,
  }
}

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <div>Burger controls</div>
      </Fragment>
    )
  }
}

export default BurgerBuilder;