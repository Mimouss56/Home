import axios from 'axios';
import { useState } from 'react';
import {
  Form, Input, Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginPost } from '../../@types/login';

function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState(false);
  const url = `http://localhost:${process.env.PORT}`;

  const handleSubmit = (values: LoginPost) => {
    axios.post(`${url}/login`, values).then((res) => {
      const infoUser = {
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        role: res.data.role,
      };
      sessionStorage.setItem('sessionToken', res.data.sessionToken);
      sessionStorage.setItem('user', JSON.stringify(infoUser));
      sessionStorage.setItem('notifToast', res.data.message);
      setSuccess(true);
      setLoading(false);
      window.location.reload();
    }).catch((err) => {
      setError(true);
      setErrorMessage(err.response.data);
      setLoading(false);
    });
  };

  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: false }}
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
              <Form.Item />
            </div>
            <div className="modal-footer d-flex justify-content-around">
              <Button
                type="primary"
                htmlType="button"
                className="btn btn-secondary"
                data-bs-target="#modalregister"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Register
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="btn btn-primary"
                loading={loading}
              >
                Log in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default Login;
