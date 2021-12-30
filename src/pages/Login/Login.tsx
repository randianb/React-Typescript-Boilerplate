import React from 'react';
import Auth from './Auth';
import { Redirect } from 'react-router';

export class Login extends React.Component {
  onLogin = () => {
    this.setState({
      islogin : true
    })
  };
  public render() {
    return !this.state ? <Auth onLogin={this.onLogin} /> : <Redirect to="/"></Redirect>
  }
}
