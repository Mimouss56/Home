import { useState } from 'react';
import axiosInstance from '../../utils/axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSubmit = async () => {
    const dataInput = {
      username,
      password,
      confirmPassword,
      email,
    };

    try {
      setLoading(true);
      setError(false);
      setErrorMessage('');
      setSuccess(false);

      const res = await axiosInstance.post('/home/register', dataInput);
      sessionStorage.setItem('notifToast', `${res.data.message}, Merci de vous reconnecter !`);

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      const { response } = err as any;
      setError(true);
      setErrorMessage(response.data);
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id="modalregister" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">S&apos;enregistrer</h1>
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
              <i className="input-group-text">@</i>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className={`input-group mb-3 ${error ? 'has-error' : ''}`}>
              <i className="input-group-text bi bi-key" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className={`input-group-text bi bi-eye${showConfirmPassword ? '-slash' : ''}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              {error && <span className="help-block">{errorMessage}</span>}
            </div>
            {success && (
              <div className="form-group">
                <div className="alert alert-success" role="alert">
                  Login success
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-target="#modalLogin"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
