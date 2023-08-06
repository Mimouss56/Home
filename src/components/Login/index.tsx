import axios from 'axios';
import './style.scss';
import { useState } from 'react';
import {
  Form, Input, Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { LoginPost } from '../../@types/login';

function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notifToast, setnotifToast] = useState({ text: '', color: '' });
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (values: LoginPost) => {
    // promise to get the values from the api
    axios.post('http://localhost:3001/login', values).then((res) => {
      if (res.data.error) {
        setError(true);
        setErrorMessage(res.data.error);
        setLoading(false);
        setnotifToast({
          text: res.data.message,
          color: 'danger',
        });
      } else {
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
        setnotifToast({
          text: res.data.message,
          color: 'success',
        });

        navigate('/');
      }
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
        setnotifToast(values.message);
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
              <Button
                type="primary"
                htmlType="submit"
                className="login__container__form__button"
                loading={loading}
                data-bs-dismiss="modal"
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
function toastify(notifToast: string) {
  throw new Error('Function not implemented.');
}
