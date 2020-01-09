import React, { Fragment, useState } from 'react';
import Toolbar from '../Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../SideDrawer/SideDrawer';

const Layout = (props) => {

  const [sideIsOpen, toggleSideOpen] = useState(false);

  function toggleOpen() {
    toggleSideOpen(!sideIsOpen);
  }

  return (
    <Fragment>
      <Toolbar sideControl={toggleOpen} />
      <SideDrawer isOpen={sideIsOpen} sideControl={toggleOpen}/>
      <main className={styles.Content}>{props.children}</main>
    </Fragment>
  )
}

export default Layout;