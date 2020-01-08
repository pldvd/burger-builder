import React from 'react';
import styles from './OrderSummary.module.scss';
import Button from '../UI/Button/Button';

const OrderSummary = (props) => {
  const finalOrder = Object.keys(props.ingredients).map(ingr => {
    return (
      <li key={ingr}>
        <span>{ingr}: </span>{props.ingredients[ingr]}
      </li>
    );
  })
  return (
    <div className={styles.OrderSummary}>
      <p className={styles.closeIcon} onClick={props.setVisibility}>&times;</p>
      <h3>Your final order</h3>
      <p> A tasty burger with the following ingredients is coming up:</p>
      <ul>
        {finalOrder}
      </ul>
      <p>Continue?</p>
      <Button color="green" clicked={props.continueOrder}>Continue</Button>
      <Button color="red" clicked={props.cancelOrder}>Cancel</Button>
    </div>
  )
}

export default OrderSummary;