import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

interface ModalProps {
  isOpen: boolean,
  isLoading: boolean,
  setVisibility: () => void,
  
}

class Modal extends React.Component<ModalProps> {

shouldComponentUpdate(nextProps: ModalProps, nextState: {}) {
  return nextProps.isOpen !== this.props.isOpen || nextProps.isLoading !== this.props.isLoading;
}

render() {
  return (
    <React.Fragment>
      <Backdrop show={this.props.isOpen} setVisibility={this.props.setVisibility}/>
      <div className={styles.Modal} style={
        { transform: this.props.isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -1000px)' }
      }>
        {this.props.children}
      </div>
    </React.Fragment>
  )
}
}

export default Modal;