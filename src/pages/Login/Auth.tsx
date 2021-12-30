import React from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import axios from 'axios';

export interface IFormInputValues {
  username: string;
  password: string;
  isRemember: boolean;
  isOnLogin: boolean;
  token: string;
}

export function getFormValues(islogin: boolean) {
  const storedValues = localStorage.getItem('form');
  if (!storedValues)
    return {
      username: '',
      password: '',
      isRemember: false,
      token: ''
    };
  const val = JSON.parse(storedValues);
  if (islogin && !val.isRemember) {
    return {
      username: '',
      password: '',
      isRemember: false,
      isOnLogin: false,
      token: ''
    };
  }
  return val;
}
type Props = {
  onLogin: () => void,
}
const Auth = ({ onLogin }: Props) => {
  const setupurl = `${process.env.REACT_APP_MES_SERVER_URL}neu-runtime/ef210fff_f87d_478a_b74d_d2355633971f`;
  const [values, setValues] = React.useState<IFormInputValues>(getFormValues(true));

  React.useEffect(() => {
    localStorage.setItem('form', JSON.stringify(values));
  }, [values]);


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setValues((previousValues) => ({
      ...previousValues, isOnLogin: true
    }));
    event.preventDefault();
    if (!process.env.REACT_APP_MES_AUTH_URL) { throw new Error('missing REACT_APP_MES_AUTH_URL config'); }
    const authurl = process.env.REACT_APP_MES_AUTH_URL;
    const url = authurl + `oauth/token?grant_type=password&username=${values.username}&password=${values.password}`
    await axios.post(url)
      .then(response => {
        if (response.status == 200) {
          let data = response.data;
          setValues((previousValues) => ({
            ...previousValues, token: data.value
          }));
          setValues((previousValues) => ({
            ...previousValues, isOnLogin: false
          }));
          onLogin();
        }
        else {
          console.log(response)
          setValues((previousValues) => ({
            ...previousValues, isOnLogin: false
          }));
        }
      }).catch(function (error) {
        console.log(error);
        setValues((previousValues) => ({
          ...previousValues, isOnLogin: false
        }));
      });


  }
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    event.persist()
    if (event.target.name == 'isRemember') {
      setValues((previousValues) => ({
        ...previousValues,
        [event.target.name]: !values.isRemember
      }));
    }
    else {
      setValues((previousValues) => ({
        ...previousValues,
        [event.target.name]: event.target.value
      }));
    }
  }
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              抽检大屏
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              请使用MES用户登录，如果还没有账号，请{' '}
              <a
                href={setupurl}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                在MES注册新的用户
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  用户名
                </label>
                <input
                  id="email-address"
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="用户名"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="密码"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="isRemember"
                  onChange={handleChange}
                  defaultChecked={values.isRemember}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  记住我
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {values.isOnLogin
                    ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    : <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  }
                </span>
                登 录
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Auth;