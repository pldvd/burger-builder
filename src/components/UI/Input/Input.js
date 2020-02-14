import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {

  let inputElement = null;
  const { isValid, touchedFields, ...rest } = props;
  const hasBeenTouched = touchedFields.includes(props.name);
  const inPutStyles = [styles.inputElement];

  (hasBeenTouched && !isValid) && inPutStyles.push(styles.invalidField);

  switch (rest.inputtype) {
    case ('input'):
      inputElement = <input className={inPutStyles.join(' ')} {...rest} />;
      break;
    case ('select'):
      inputElement = <select className={inPutStyles.join(' ')} {...rest}>
        {
          rest.displayvalues.map(displayValue => {
            return <option value={displayValue} key={displayValue}>{displayValue}</option>
          })
        }
      </select>;
      break;
    default:
      inputElement = <input className={inPutStyles.join(' ')} {...rest} />;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.label} htmlFor={rest.id}>{rest.name}</label>
      {inputElement}
    </div>
  )
}

export default Input;