import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {

  let inputElement = null;

  switch (props.inputtype) {
    case ('input'):
      inputElement = <input
        className={styles.inputElement}
        {...props}
        value={props.value} />;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={styles.inputElement}
        {...props}
        value={props.value} />;
      break;
    case ('select'):
      inputElement = <select
        className={styles.inputElement}
        {...props}
        value={props.value}
        displayvalues={props.displayValues}
        >
        {
          props.displayvalues.map(displayValue => {
          return <option value={displayValue} key={displayValue}>{displayValue}</option>
          })
        }
      </select>;
      break;
    default:
      inputElement = <input className={styles.inputElement} {...props} />;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.label} htmlFor={props.id}>{props.name}</label>
      {inputElement}
    </div>
  )
}

export default Input;