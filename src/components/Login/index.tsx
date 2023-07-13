import React, { useState } from 'react';
import {
  Form, Input, Button, Alert,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../assets/react.svg';

function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
              <Button
                type="primary"
                htmlType="submit"
                className="login__container__form__button"
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div className="login__container__form__register-link">
            <a href="/register">Register now!</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
