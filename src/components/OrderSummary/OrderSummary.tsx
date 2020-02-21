import React from 'react';
import styles from './OrderSummary.module.scss';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import { IngredientType } from '../Burger/Burger';

interface OrderSummaryProps {
  ingredients: IngredientType,
  setVisibility: () => void,
  continueOrder: () => void,
  cancelOrder: () => void,
  price: number,
  loading: boolean
}

class OrderSummary extends React.Component<OrderSummaryProps> {

  render() {
    const finalOrder = Object.keys(this.props.ingredients).map(ingr => {
      return (
        <li key={ingr}>
          <span>{ingr}: </span>{this.props.ingredients[ingr]}
        </li>
      );
    })

    const fullOrderSummary = (
      <div className={styles.OrderSummary}>
        <p className={styles.closeIcon} onClick={this.props.setVisibility}>&times;</p>
        <h3 className={styles.header}>Your final order</h3>
        <p> A tasty burger with the following ingredients is coming up:</p>
        <ul className={styles.ingredients}>
          {finalOrder}
        </ul>
        <p>The price is<span style={{ fontSize: '1.2em' }}> {this.props.price.toFixed(2)} USD </span></p>
        <Button color="green" clicked={this.props.continueOrder}>Continue</Button>
        <Button color="red" clicked={this.props.cancelOrder}>Cancel</Button>
      </div>
    );

    return this.props.loading ? <Loader /> : fullOrderSummary;
  }
}

export default OrderSummary;