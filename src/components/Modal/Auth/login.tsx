import {
  FormEvent, useContext, useRef, useState,
} from 'react';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { userContext } from '../../../store/user.context';
import axiosInstance from '../../../utils/axios';
import { ILoggedUser } from '../../../@types/Home/user';

export default function Login() {
  const { setUser } = useContext(userContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const loginRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result: AxiosResponse<ILoggedUser> = await axiosInstance.post('/api/home/login', {
        username,
        password,
      });
      const {
        sessionToken, message, user,
      } = result.data;
      sessionStorage.setItem('sessionToken', sessionToken);
      toast.success(`🦄 ${message} !`);
      setUser(user);
      loginRef.current?.classList.remove('fade');
    } catch (err) {
      setError(true);
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data);
      } else {
        setErrorMessage(`'Une erreur inattendue est survenue: '${err}`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={loginRef}
      className="modal fade"
      id="modalLogin"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className={`modal-dialog modal-dialog-centered ${error ? 'shake' : ''}`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Connexion</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body has-validation">
            <div className="input-group mb-3 ">
              <i className="input-group-text bi bi-person" />
              <input
                id="username"
                type="text"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-describedby="username"
              />

            </div>
            <div className="input-group mb-3 ">
              <i className="input-group-text bi bi-key" />
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={`input-group-text bi bi-eye${showPassword ? '-slash' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
              />

            </div>
            <div className="help-block text-danger">
              {errorMessage}
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-target="#modalregister"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              S&apos;enregistrer
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
