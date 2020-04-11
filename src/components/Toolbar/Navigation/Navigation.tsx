import React from 'react';
import styles from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface NavigationProps {
  type: string
}

const Navigation: React.FC<NavigationProps> = (props) => {
  const isAuthenticated = useSelector((state: any) => !!state.auth.token);

  return (
    <ul className={[styles.Navigation, styles[props.type]].join(' ')}>
      <NavLink to='/hello' activeClassName={styles.activeLink}>Hello</NavLink>
      {isAuthenticated
        ? <NavLink to='/orders' activeClassName={styles.activeLink}>Orders</NavLink>
        : null
      }
      {isAuthenticated
        ? <NavLink to='/logout' activeClassName={styles.activeLink}>Log-out</NavLink>
        : <NavLink to='/auth' activeClassName={styles.activeLink}>Log-in</NavLink>
      }
    </ul>
  )
};

export default Navigation;
