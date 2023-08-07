/* eslint-disable react/no-unstable-nested-components */
import axios from 'axios';
import { useState } from 'react';
import { redirect } from 'react-router-dom';
import {
  Form, Input, Button, Alert,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { RegisterPost } from '../../@types/register';
import './style.scss';

function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (values: RegisterPost) => {
    const url = 'http://localhost:3002/register';
    const data = {
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: values.email,
    };
    console.log('Received values of form: ', values);
    axios.post(url, data).then((res) => {
      if (res.data.error) {
        setError(true);
        setErrorMessage(res.data.error);
        setLoading(false);
      } else {
        console.log('Received values of form: ', res.data);
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
      name="register"
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
        id="modalregister"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">S&apos;enregistrer</h1>
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
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: 'Please confirm your password!' }]}
                validateStatus={error ? 'error' : 'success'}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Confirm Password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              {success && (
                <Form.Item>
                  <Alert message="Login success" type="success" showIcon />
                </Form.Item>
              )}

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-target="#modalLogin"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Login
              </button>
              <Button
                type="primary"
                htmlType="submit"
                className="login__container__form__button"
                loading={loading}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default Register;
