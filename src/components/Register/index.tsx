import React, { useState } from 'react';
import {
  Form, Input, Button, Alert,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../assets/react.svg';
import { IRegister } from '../../@types/register';

function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (values: IRegister) => {
    // requetes POST axiios
    const url = 'http://localhost:3001/api/v1/auth/login';
    const data = {
      username: values.username,
      password: values.password,
      email: values.email,
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    console.log('Received values of form: ', values);
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__container__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="register__container__form">
          <Form
            form={form}
            name="register"
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
              handleSubmit(values);
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
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
              validateStatus={error ? 'error' : 'success'}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
              <Button type="primary" htmlType="submit" className="register__container__form__button" loading={loading}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
