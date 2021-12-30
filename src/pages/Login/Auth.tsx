import React from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';

export interface IFormInputValues {
  username: string;
  password: string;
  isRemember: boolean;
  token: string;
}

export function getFormValues() {
  const storedValues = localStorage.getItem('form');
  if (!storedValues)
    return {
      username: '',
      password: '',
      isRemember: false,
      token: ''
    };
  const val = JSON.parse(storedValues);
  if (!val.isRemember) {
    return {
      username: '',
      password: '',
      isRemember: false,
      token: ''
    };
  }
  return val;
}
export default function Auth() {
  const [values, setValues] = React.useState<IFormInputValues>(getFormValues);

  React.useEffect(() => {
    localStorage.setItem('form', JSON.stringify(values));
  }, [values]);


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const host_port = "http://192.168.138.198:8080/ime-start/"
    const url = host_port + `oauth/token?grant_type=password&username=${values.username}&password=${values.password}`
    try {
      const response = await fetch(url, { method: 'post' });
      if (response.ok) {
        const data = await response.json();
        setValues((previousValues) => ({
          ...previousValues, token: data.value
        }));
        window.location.href="/"
      }
      else {

      }
    } catch (error) {
      console.log(error)
    }
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
                href="#"
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
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
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
