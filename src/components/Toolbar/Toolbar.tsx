import React from 'react';
import styles from './Toolbar.module.scss';
import Navigation from './Navigation/Navigation';
import HamburgerIcon from '../UI/HamburgerIcon/HamburgerIcon';
import logoImage from '../../../src/burger-logo.png';

interface ToolBarProps {
sideControl: () => void
}

const Toolbar: React.FC<ToolBarProps> = (props) => {
  return (
    <header className={styles.Toolbar}>
      <img src={logoImage} alt={'Burger logo'} />
      <Navigation type='header' sideControl={props.sideControl}/>
      <HamburgerIcon sideControl={props.sideControl}/>
    </header>
  )
}

export default Toolbar;