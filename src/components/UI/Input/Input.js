import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {

  let inputElement = null;

  switch (props.type) {
    case ('input'):
      inputElement = <input className={styles.inputElement} {...props} />;
      break;
    case ('textarea'):
      inputElement = <textarea className={styles.inputElement} {...props} />;
      break;
    default:
      inputElement = <input className={styles.inputElement} {...props} />;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default Input;