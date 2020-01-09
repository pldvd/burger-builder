import React from 'react';
import styles from './Toolbar.module.scss';
import Navigation from './Navigation/Navigation';
import logoImage from '../../../src/burger-logo.png';

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <img src={logoImage} alt={'Burger logo'}/>
      <Navigation />
      <div>SideDrawer</div>
    </header>
  )
}

export default Toolbar;