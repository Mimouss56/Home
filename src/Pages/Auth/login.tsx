import { useState } from 'react';
import axiosInstance from '../../utils/axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(false);
      setErrorMessage('');

      const res = await axiosInstance.post('/home/login', { username, password });
      const { data, sessionToken, message } = res.data;

      sessionStorage.setItem('sessionToken', sessionToken);
      sessionStorage.setItem('user', JSON.stringify(data));
      sessionStorage.setItem('notifToast', message);
      setLoading(false);
      window.location.reload();
    } catch (err) {
      const { response } = err as { response: { data: string } };
      setError(true);
      setErrorMessage(response.data);
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id="modalLogin" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Connexion</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className={`input-group mb-3 ${error ? 'has-error' : ''}`}>
              <i className="input-group-text bi bi-person" />
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {error && <span className="help-block">{errorMessage}</span>}
            </div>
            <div className={`input-group mb-3 ${error ? 'has-error' : ''}`}>
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

              {error && <span className="help-block">{errorMessage}</span>}
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
              Register
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
