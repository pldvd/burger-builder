import React from 'react';
import styles from './Navigation.module.scss';
import {NavLink} from 'react-router-dom';

interface NavigationProps {
  type: string
}

const Navigation: React.FC<NavigationProps> = (props) => (
  <ul className={[styles.Navigation, styles[props.type]].join(' ')}>
    <NavLink to='/hello'>Hello</NavLink>
    <NavLink to='/orders'>Orders</NavLink>
  </ul>
);

export default Navigation;
