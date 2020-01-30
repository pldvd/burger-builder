import React from 'react';
import style from './Button.module.scss';

export interface ButtonProps {
  color: string,
  clicked: (e: React.FormEvent) => void
}

const Button: React.FC<ButtonProps> = (props) => {
  return <button onClick={props.clicked} className={`${style.Button} ${style[props.color]}`}>{props.children}</button>;
};

export default Button;
