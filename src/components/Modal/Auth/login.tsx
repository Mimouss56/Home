import {
  FormEvent, useContext, useRef, useState,
} from 'react';
import { toast } from 'react-toastify';
import { userContext } from '../../../store/user.context';
import axiosInstance from '../../../utils/axios';

function Login() {
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
      const res = await axiosInstance.post('/api/home/login', { username, password });
      const {
        sessionToken, message, user,
      } = res.data;

      sessionStorage.setItem('sessionToken', sessionToken);
      toast.success(`🦄 ${message} !`);
      setUser(user);
      loginRef.current?.classList.remove('show');
      const backdrop = document.querySelector('.modal-backdrop') as HTMLElement;
      backdrop.remove();

      // on modifie le contexte de user
    } catch (err) {
      const { response } = err as { response: { data: string } };
      setErrorMessage(response.data);
      setError(true);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
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
          <div className="modal-body">
            <div className="input-group mb-3 has-validation">
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
              <div id="username" className="invalid-feedback">
                {errorMessage}
              </div>
            </div>
            <div className="input-group mb-3 ">
              <i className="input-group-text bi bi-key" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
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
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
