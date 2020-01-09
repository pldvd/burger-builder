import React from 'react';
import styles from './SideDrawer.module.scss';
import Navigation from '../Toolbar/Navigation/Navigation';

const SideDrawer = () => {
  return (
    <div className={styles.SideDrawer}>
      <Navigation />
    </div>
  )
}

export default SideDrawer;