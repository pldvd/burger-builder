import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Authentication/Authentication';
import LogOut from './containers/Logout/Logout';
import { connect } from 'react-redux';
import { checkAuth } from './store/actions/auth-actions';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = (props: any) => {

  useEffect(() => {
    const authData = localStorage.getItem('authData');
    props.checkAuth(authData);
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/orders' component={Orders} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/auth' component={Authentication} />
            <Route path='/logout' component={LogOut} />
            <Route path='/' component={BurgerBuilder} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    checkAuth: (token: string) => dispatch(checkAuth(token))
  }
}
export default connect(null, mapDispatchToProps)(App);
