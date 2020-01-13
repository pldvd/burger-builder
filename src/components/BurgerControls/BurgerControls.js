import React from 'react';
import styles from './BurgerControls.module.scss';
import BurgerControl from './BurgerControl/BurgerControl';
import PropTypes from 'prop-types';

const BurgerControls = (props) => {
  const ingredNames = Object.keys(props.ingredients);

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
      <button className={styles.btn} onClick={props.setVisibility} disabled={!props.canPurchase}>order now</button>
    </div>
  )
}

BurgerControls.propTypes = {
  ingredients: PropTypes.object,
  changeAmount: PropTypes.func,
  price: PropTypes.number,
  canPurchase: PropTypes.bool,
  setVisibility: PropTypes.func  
}

export default BurgerControls;

//example to follow: https://burger-builder-1efe7.firebaseapp.com/