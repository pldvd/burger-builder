import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Authentication/Authentication';
import LogOut from './containers/Logout/Logout';
import { connect } from 'react-redux';
import { checkAuth } from './store/actions/auth-actions';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const App = (props: any) => {

  useEffect(() => {
    const authData = localStorage.getItem('authData');
    props.checkAuth(authData);
  }, [])

  let routes = (
    <Switch>
      <Route path='/auth' component={Authentication} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/'/>
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/orders' component={Orders} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/auth' component={Authentication} />
        <Route path='/logout' component={LogOut} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </Switch>
    )
  }

  return (
    <div>
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    checkAuth: (token: string) => dispatch(checkAuth(token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
