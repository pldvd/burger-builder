import React from 'react';
import styles from './BurgerControl.module.scss';
import PropTypes from 'prop-types';

const BurgerControl = (props) => {

  return (
    <div className={styles.BurgerControl}>
      <p className={styles.text}>{props.name}</p>
      <p className={styles.text}>{props.amount}</p>
      <button className={`${styles.btn} ${styles['btn--less']}`} onClick={() => props.changeAmount('less', props.name)} disabled={props.amount > 0 ? false : true}>Less</button>
      <button className={`${styles.btn} ${styles['btn--more']}`} onClick={() =>  props.changeAmount('more', props.name)}>More</button>
    </div>
  );
}

BurgerControl.propType = {
  name: PropTypes.string,
  amount: PropTypes.number,
  changeAmount: PropTypes.func,
}

export default BurgerControl;