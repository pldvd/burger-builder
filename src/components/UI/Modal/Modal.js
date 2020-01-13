import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.isOpen} />
      <div className={styles.Modal} style={
        { transform: props.isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -1000px)' }
      }>
        {props.children}
      </div>
    </React.Fragment>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool
}

export default Modal;