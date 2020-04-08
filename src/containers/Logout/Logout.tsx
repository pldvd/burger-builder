import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/auth-actions';
import {LogoutProps} from './types';


class LogOut extends Component<LogoutProps> {

  componentDidMount() {
    this.props.logout()
  }

  render() {
    return <Redirect to='/' />
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logOut())
  }
}

export default connect(null, mapDispatchToProps)(LogOut);