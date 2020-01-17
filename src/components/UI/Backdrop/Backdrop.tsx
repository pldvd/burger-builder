import React from 'react';
import styles from './Backdrop.module.scss';

interface BackdropProps {
  show: boolean,
  setVisibility?: () => void
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return props.show ? <div className={styles.Backdrop} onClick={props.setVisibility}>{props.children}</div> : null;
}


export default Backdrop;