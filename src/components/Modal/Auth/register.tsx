import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import { IRegister } from '../../../@types/register';
import useFormInput from '../../../hook/useFormInput';
import { ILoggedUser } from '../../../@types/Home/user';
import InputText from '../../Form/inputText';

const initRegister: IRegister = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function Register() {
  const {
    form, handleChange, error, errorMessage, setError, setErrorMessage,
  } = useFormInput(initRegister);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res: AxiosResponse<ILoggedUser> = await axiosInstance.post('/api/home/register', form);
      toast.info(`${res.data.message}, Merci de vous reconnecter !`);

      setLoading(false);
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
            <InputText
              title="Username"
              text={form.username}
              name="username"
              icon="person"
              onChange={handleChange}
            />
            <InputText
              title="Email"
              text={form.email}
              name="email"
              icon="envelope-at"
              onChange={handleChange}
              type="email"
            />
            <div className={`input-group mb-3 ${error ? 'has-error' : ''}`}>
              <span className="input-group-text"><i className="bi bi-key px-1" /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={`input-group-text bi bi-eye${!showPassword ? '-slash' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className={`input-group mb-3 ${error ? 'has-error' : ''}`}>
              <span className="input-group-text"><i className="bi bi-key px-1" /></span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Confirm password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className={`input-group-text bi bi-eye${!showConfirmPassword ? '-slash' : ''}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {error && <span className="help-block">{errorMessage}</span>}

          </div>
          <div className="modal-footer d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-target="#modalLogin"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Se connecter
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              S&apos;enregistrer
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;
