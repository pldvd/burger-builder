import React from 'react';
import styles from './BurgerControls.module.scss';
import BurgerControl from './BurgerControl/BurgerControl';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface Ingredients {
  salad: number,
  cheese: number,
  bacon: number,
  meat: number,
  [index: string]: number
}

interface BurgerControlProps extends RouteComponentProps {
  ingredients: Ingredients,
  changeAmount: (lessOrMore: string, ingredient: string) => void,
  price: number,
  canPurchase: boolean,
  setVisibility: () => void,
  hasToken: boolean
}

const BurgerControls: React.FC<BurgerControlProps> = (props) => {
  const ingredNames = Object.keys(props.ingredients);

  const proceed = () => {
    if (props.hasToken) {
      props.setVisibility();
    } else {
      console.log(props);
      props.history.push('/auth');
    }
  }

  return (
    <div className={styles.BurgerControls}>
      <p className={styles.price}>Price: {props.price.toFixed(2)} USD</p>
      {
        ingredNames.map(ingredient => <BurgerControl
          name={ingredient}
          key={ingredient}
          amount={props.ingredients[ingredient]}
          changeAmount={props.changeAmount}></BurgerControl>)
      }
      <button
        className={styles.btn}
        onClick={proceed}
        disabled={!props.canPurchase}>
        {props.hasToken ? 'order now' : 'log-in to proceed'}
      </button>
    </div>
  )
}

export default withRouter(BurgerControls);

//example to follow: https://burger-builder-1efe7.firebaseapp.com/