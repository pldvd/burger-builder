import React from 'react';
import style from './Button.module.scss';
import PropTypes from 'prop-types';

const Button = (props) => {
  return <button onClick={props.clicked} className={`${style.Button} ${style[props.color]}`}>{props.children}</button>;
};

Button.propTypes = {
  color: PropTypes.string,
  clicked: PropTypes.func
}

export default Button;
