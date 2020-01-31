import React from 'react';
import styles from './Navigation.module.scss';
import {NavLink} from 'react-router-dom';

interface NavigationProps {
  type: string
}

const Navigation: React.FC<NavigationProps> = (props) => (
  <ul className={[styles.Navigation, styles[props.type]].join(' ')}>
    <NavLink to='/hello' activeClassName={styles.activeLink}>Hello</NavLink>
    <NavLink to='/orders' activeClassName={styles.activeLink}>Orders</NavLink>
  </ul>
);

export default Navigation;
