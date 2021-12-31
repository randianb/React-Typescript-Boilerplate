import React, { useRef } from 'react';
import { Redirect } from 'react-router';
import { IFormInputValues, getFormValues } from '../Login/Auth'
import Alert from '../../components/Alert'
import Table from '../../components/Table'

export default function HomePage() {
  const [values] = React.useState<IFormInputValues>(getFormValues(false));
  const childRef = useRef<{openModal:()=>{}}>(null!);

  if (values.token.length > 0) {
    return (
      <main className="home">
        <h1>Welcome</h1>

        <Alert title='抽检结果' message='抽检正在进行中' confirmtxt='确认' ref={childRef}></Alert>
        <button onClick={() => childRef.current.openModal()}>Click Parent</button>
        <Table></Table>
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


