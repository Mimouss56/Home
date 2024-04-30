import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useCheckPassword from '../../hook/utils/usePasswordCheck';
import useFormInput from '../../hook/useFormInput';
import axiosInstance from '../../utils/axios';
import { ErrorAxios } from '../../@types/error';
import useUserStore from '../../store/user.store';

const initData = {
  password: '',
  confirmPassword: '',
};

function Password() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const user = useUserStore((state) => state.user);
  const {
    // setPassword,
    // password,
    // setConfirmPassword,
    // confirmPassword,
    checkPassword,
    error,
    errorMessage,
  } = useCheckPassword();

  const { handleChange, form } = useFormInput(initData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // On met à jour les infos du user par la route /user/:id
    try {
      const response = await axiosInstance.put(
        `/api/home/user/${user.id}`,
        { ...form, passwordEdit: true },
      );
      toast.info(response.data.message);
    } catch (err) {
      const errorAxios = err as AxiosError;
      const errorData = errorAxios.response?.data as ErrorAxios;
      toast.warning(
        errorData?.message
        || "Une erreur s'est produite lors de l'upload de l'image.",
      );
    }
  };

  useEffect(() => {
    checkPassword(form.password, form.confirmPassword);
  }, [checkPassword, form]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="card border-primary">
        <div className="card-body">
          <h4 className="card-title mt-4 text-primary">
            Modifier le mot de passe
          </h4>
          <div
            className={`input-group mb-3 ${error ? 'has-error' : ''}`}
          >
            <i className="input-group-text bi bi-key" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Password"
              value={form.password}
              name="password"
              onChange={handleChange}
            />
            <button
              type="button"
              className={`input-group-text bi bi-eye${showPassword ? '-slash' : ''}`}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div
            className={`input-group mb-3 ${error ? 'has-error' : ''}`}
          >
            <i className="input-group-text bi bi-key" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Confirm password"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
            <button
              type="button"
              className={`input-group-text bi bi-eye${showConfirmPassword ? '-slash' : ''}`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          {error && (
            <span className="form-text text-bg-danger badge ">
              {errorMessage}
            </span>
          )}
        </div>
        <div className="card-footer text-end ">
          <button type="submit" className="btn btn-primary">
            Enregistrer
          </button>

        </div>
      </div>
    </form>
  );
}

export default Password;
