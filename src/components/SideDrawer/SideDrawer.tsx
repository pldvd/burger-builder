import React from 'react';
import styles from './SideDrawer.module.scss';
import Navigation from '../Toolbar/Navigation/Navigation';

interface SideDrawerProps {
  isOpen: boolean,
  sideControl: () => void
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {

  return (
    <div className={styles.SideDrawer} style={{
      transform: props.isOpen ? 'translateY(0)' : 'translateY(-100%)'
    }}>
      <p className={styles.close} onClick={props.sideControl}>&times;</p>
      <Navigation type='sideDrawer'/>
    </div>
  )
}

export default SideDrawer;