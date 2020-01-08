import React from 'react';
import style from './Button.module.scss';

const Button = (props) => {
  return <button onClick={props.clicked} className={`${style.Button} ${style[props.color]}`}>{props.children}</button>;
};

export default Button;
