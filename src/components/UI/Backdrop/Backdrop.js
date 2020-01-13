import React from 'react';
import styles from './Backdrop.module.scss';
import PropTypes from 'prop-types';

const Backdrop = (props) => {
  return props.show ? <div className={styles.Backdrop}>{props.children}</div> : null;
}

Backdrop.protoTypes = {
  show: PropTypes.bool
}

export default Backdrop;