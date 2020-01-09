import React from 'react';
import styles from './Toolbar.module.scss';
import logoImage from '../../../src/burger-logo.png';

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <img src={logoImage} alt={'Burger logo'}/>
      <nav>NavList</nav>
      <div>SideDrawer</div>
    </header>
  )
}

export default Toolbar;