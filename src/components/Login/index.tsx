<<<<<<< HEAD
import axios from 'axios';
import './style.scss';
import { useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
import {
  Form, Input, Button, Alert,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
<<<<<<< HEAD
import { redirect } from 'react-router-dom';
import { LoginPost, LoginResponse } from '../../@types/login';
import { User } from '../../@types/user';
=======
import logo from '../../assets/react.svg';
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe

function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
<<<<<<< HEAD
  const [notifToast, setnotifToast] = useState('');
  const [success, setSuccess] = useState(false);

  const saveSession = async (data: LoginResponse) => {
    setnotifToast(data.message);
    const infoUser = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
    };
    sessionStorage.setItem('sessionToken', data.sessionToken);
    sessionStorage.setItem('user', JSON.stringify(infoUser));
    setSuccess(true);
    setLoading(false);
  };

  const handleSubmit = (values: LoginPost) => {
    // promise to get the values from the api
    axios.post('http://localhost:3001/login', values).then((res) => {
      if (res.data.error) {
        setError(true);
        setErrorMessage(res.data.error);
        setLoading(false);
      } else {
        saveSession(res.data);
        redirect('/');
      }
      // redirection sur la page d'accueil
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      onFinish={(values) => {
        setLoading(true);
        setError(false);
        setErrorMessage('');
        setSuccess(false);
        handleSubmit(values);
      }}
    >
      <div
        className="modal fade"
        id="modalLogin"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Connexion</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">

              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                validateStatus={error ? 'error' : 'success'}
                help={errorMessage}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                validateStatus={error ? 'error' : 'success'}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              {success && (
                <Form.Item>
                  <Alert message="Login success" type="success" showIcon />
                </Form.Item>
              )}
              <Form.Item />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-target="#modalregister"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Register
              </button>
=======
  const [success, setSuccess] = useState(false);

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__container__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="login__container__form">
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={(values) => {
              setLoading(true);
              setError(false);
              setErrorMessage('');
              setSuccess(false);
              setTimeout(() => {
                if (values.username === 'admin' && values.password === 'admin') {
                  setSuccess(true);
                } else {
                  setError(true);
                  setErrorMessage('Invalid username or password');
                }
                setLoading(false);
              }, 1000);
            }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
              validateStatus={error ? 'error' : 'success'}
              help={errorMessage}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              validateStatus={error ? 'error' : 'success'}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {success && (
              <Form.Item>
                <Alert message="Login success" type="success" showIcon />
              </Form.Item>
            )}
            <Form.Item>
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
              <Button
                type="primary"
                htmlType="submit"
                className="login__container__form__button"
                loading={loading}
              >
                Log in
              </Button>
<<<<<<< HEAD
            </div>
          </div>
        </div>
      </div>
    </Form>
=======
            </Form.Item>
          </Form>
          <div className="login__container__form__register-link">
            <a href="/register">Register now!</a>
          </div>
        </div>
      </div>
    </div>
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
  );
}

export default Login;
