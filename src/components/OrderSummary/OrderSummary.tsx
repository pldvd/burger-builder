import React from 'react';
import styles from './OrderSummary.module.scss';
import Button from '../UI/Button/Button';
import PropTypes from 'prop-types';
import Loader from '../UI/Loader/Loader';

class OrderSummary extends React.Component {

componentDidUpdate(prevProps, prevState, snapShot) {
  //this used to get invoked twice even if the modal was not displayed. (twice because the calledback passed as a prop sets the state twice (second time based on the outcome of the 1st setState call)) this is why shouldComponentUpdate was implemented in the Modal component which contains this one
  console.log('[OrderSummary] didUpdate');
}

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

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  setVisibility: PropTypes.func,
  continueOrder: PropTypes.func,
  cancelOrder: PropTypes.func,
  price: PropTypes.number,
}

export default OrderSummary;