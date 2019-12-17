import React from 'react';
import styles from './OrderSummary.module.css';

const OrderSummary = (props) => {
  const finalOrder = Object.keys(props.ingredients).map(ingr => {
    return (
      <li>
        <span>{ingr}: </span>{props.ingredients[ingr]}
      </li>
    );
  })
  return (
    <div className={styles.OrderSummary}>
      <h3>Your final order</h3>
      <p> A tasty burger with the following ingredients is coming up:</p>
      <ul>
        {finalOrder}
      </ul>
    </div>
  )
}

export default OrderSummary;