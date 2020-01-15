import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

class Modal extends React.Component {

shouldComponentUpdate(nextProps, nextState) {
  return nextProps.isOpen !== this.props.isOpen || nextProps.isLoading !== this.props.isLoading;
}

render() {
  return (
    <React.Fragment>
      <Backdrop show={this.props.isOpen} />
      <div className={styles.Modal} style={
        { transform: this.props.isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -1000px)' }
      }>
        {this.props.children}
      </div>
    </React.Fragment>
  )
}
}

Modal.propTypes = {
  isOpen: PropTypes.bool
}

export default Modal;