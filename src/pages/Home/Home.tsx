import React from 'react';
import { Redirect } from 'react-router';
import { IFormInputValues, getFormValues } from '../Login/Auth'

export default function HomePage() {
  const [values] = React.useState<IFormInputValues>(getFormValues(false));

  if (values.token.length > 0) {
    return (
      <main className="home">
        <h1>Welcome</h1>
      </main>
    );
  }
  else {
    return <Redirect to="/login"></Redirect>
  }
}
export class Home extends React.Component {

  public render() {
    return <HomePage></HomePage>
  }
}
