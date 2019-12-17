import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  return props.isOpen ? (
    <Backdrop>
      <div className={styles.Modal}>
        {props.children}
      </div>
    </Backdrop>
  ) : null
}

export default Modal;