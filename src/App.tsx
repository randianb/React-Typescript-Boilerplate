import React from 'react';
import {
  Route,
  RouteComponentProps,
  withRouter,
  Switch,
  Redirect
} from 'react-router-dom';
import { Admin } from './pages/Admin/Admin';
import { Login } from './pages/Login/Login';
import './app.scss';
import { Home } from './pages/Home/Home';

class App extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div>
        <Switch>
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/admin" component={Admin}  />
          <Route exact={true} path="/" component={Home}  />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
