import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {


  render() {
    return (
      <Fragment>
        <Burger />
        <div>Burger controls</div>
      </Fragment>
    )
  }
}

export default BurgerBuilder;