import React from 'react';
import styles from './BurgerControls.module.css';
import BurgerControl from './BurgerControl/BurgerControl';

const BurgerControls = (props) => {
  const ingredNames = Object.keys(props.ingredients);

  return (
    <div className={styles.BurgerControls}>
      <p>{props.price} USD</p>
      {
        ingredNames.map(ingredient => <BurgerControl
          name={ingredient}
          key={ingredient}
          amount={props.ingredients[ingredient]}
          changeAmount={props.changeAmount}></BurgerControl>)
      }
    </div>
  )
}
export default BurgerControls;

//example to follow: https://burger-builder-1efe7.firebaseapp.com/