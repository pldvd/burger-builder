import React from 'react';
import styles from './Navigation.module.scss';

const Navigation = (props) => (
  <ul className={[styles.Navigation, styles[props.type]].join(' ')}>
    <li>Hello</li>
    <li>Bello</li>
  </ul>
);

export default Navigation;
