import React from 'react';
import styles from './BurgerControl.module.scss';

interface BurgerControlProps {
  name: string,
  amount: number,
  changeAmount: (lessOrMore: string, ingredient: string) => void,
}

const BurgerControl: React.FC<BurgerControlProps> = (props) => {

  return (
    <div className={styles.BurgerControl}>
      <p className={styles.text}>{props.name}</p>
      <p className={styles.text}>{props.amount}</p>
      <button className={`${styles.btn} ${styles['btn--less']}`} onClick={() => props.changeAmount('less', props.name)} disabled={props.amount > 0 ? false : true}>Less</button>
      <button className={`${styles.btn} ${styles['btn--more']}`} onClick={() =>  props.changeAmount('more', props.name)}>More</button>
    </div>
  );
}

export default BurgerControl;