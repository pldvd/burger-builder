import React from 'react';
import style from './Button.module.scss';

export interface ButtonProps {
  color: string,
  isDisabled?: boolean,
  clicked: (e: React.FormEvent) => void
}

const Button: React.FC<ButtonProps> = (props) => {
  return <button onClick={props.clicked} className={`${style.Button} ${style[props.color]}`} disabled={props.isDisabled || false}>{props.children}</button>;
};

export default Button;
