import React from 'react';
import styles from './Navigation.module.scss';

interface NavigationProps {
  type: string
}

const Navigation: React.FC<NavigationProps> = (props) => (
  <ul className={[styles.Navigation, styles[props.type]].join(' ')}>
    <li>Hello</li>
    <li>Bello</li>
  </ul>
);

export default Navigation;
