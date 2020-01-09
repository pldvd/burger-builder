import React from 'react';
import styles from './Toolbar.module.scss';
import Navigation from './Navigation/Navigation';
import HamburgerIcon from '../UI/HamburgerIcon/HamburgerIcon';
import logoImage from '../../../src/burger-logo.png';

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <img src={logoImage} alt={'Burger logo'} />
      <Navigation type='header' />
      <HamburgerIcon />
    </header>
  )
}

export default Toolbar;