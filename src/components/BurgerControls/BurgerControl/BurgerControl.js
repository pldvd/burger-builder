import React from 'react';
import styles from './BurgerControl.module.css';

const BurgerControl = (props) => {

  return (
    <div className={styles.BurgerControl}>
      <p>{props.name}</p>
      <p>{props.amount}</p>
      <button className={styles.btn} onClick={() => props.changeAmount('less', props.name)} disabled={props.amount > 0 ? false : true}>Less</button>
      <button className={styles.btn} onClick={() =>  props.changeAmount('more', props.name)}>More</button>
    </div>
  );
}

export default BurgerControl;