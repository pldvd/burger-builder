import React from 'react';
import style from './Button.module.scss';

interface ButtonProps {
  color: string,
  clicked: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
  return <button onClick={props.clicked} className={`${style.Button} ${style[props.color]}`}>{props.children}</button>;
};

export default Button;
