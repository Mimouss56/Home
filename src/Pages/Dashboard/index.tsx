import {
  useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import FileUploader from '../../components/fileUploader';
import useImageUpload from '../../hook/utils/useImageUpload';
import useCheckPassword from '../../hook/utils/usePasswordCheck';
import axiosInstance from '../../utils/axios';
import { ErrorAxios } from '../../@types/error';

interface IDataInput {
  last_name: string;
  first_name: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
}

export default function UserSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const {
    imageFile, setImageFile, handleUpload, resetImageUpload,
  } = useImageUpload();

  const {
    password, confirmPassword, setPassword, setConfirmPassword, checkPassword, error, errorMessage,
  } = useCheckPassword();

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const dataInput: IDataInput = {
      last_name: lastName || user.last_name,
      first_name: firstName || user.first_name,
      email: email || user.email,
    };
    // injecter password et passwordConfirm si ils sont remplis
    if (password && confirmPassword && password === confirmPassword) {
      dataInput.password = password;
      dataInput.passwordConfirm = confirmPassword;
    }
    // on update les infos du user par la route /user/:id
    try {
      const response = await axiosInstance.put(`/home/user/${user.id}`, dataInput);
      toast.info(response.data.message);
      // on mets à, jour le user dans le sessionStorage
      const newUser = {
        ...user,
        ...dataInput,
      };
      sessionStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      const errorAxios = err as AxiosError;
      const errorData = errorAxios.response?.data as ErrorAxios;
      toast.warning(errorData?.message || 'Une erreur s\'est produite lors de l\'upload de l\'image.');
    }

    setEditName(false);
    setEditEmail(false);
    resetImageUpload();
  };

  useEffect(() => {
    checkPassword();

    if (user.avatar !== imageFile) {
      setImageFile(imageFile);
    }
  }, [checkPassword, user.avatar, imageFile, setImageFile]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card border-white">
            <div className="card-body">
              <h4 className="card-title text-white">
                Informations Général de
                {' '}
                {user.username}
              </h4>
              <FileUploader submit={() => handleUpload} img={user.avatar.path || ''} />

              <div className="input-group mb-3">
                <span className="input-group-text" id="Nom">Nom</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder={user.last_name}
                  aria-label="last_name"
                  aria-describedby="Nom"
                  value={lastName}
                  disabled={!editName}
                  onChange={(e) => setLastName(e.target.value)}

                />
                <button
                  type="button"
                  className={`input-group-text text-bg-${editName ? 'success' : 'warning'}`}
                  onClick={() => setEditName(!editName)}
                >
                  <i className={`bi bi-${editName ? 'check' : 'pencil'}`} />
                </button>

              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="Prénom">Prénom</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder={user.first_name}
                  aria-label="first_name"
                  aria-describedby="Prénom"
                  value={firstName}
                  disabled={!editName}
                  onChange={(e) => setFirstName(e.target.value)}

                />
                <button
                  type="button"
                  className={`input-group-text text-bg-${editName ? 'success' : 'warning'}`}
                  onClick={() => setEditName(!editName)}
                >
                  <i className={`bi bi-${editName ? 'check' : 'pencil'}`} />
                </button>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="Email">Email</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder={user.email}
                  aria-label="Email"
                  aria-describedby="Email"
                  value={email}
                  disabled={!editEmail}
                  onChange={(e) => setEmail(e.target.value)}

                />
                <button
                  type="button"
                  className={`input-group-text text-bg-${editEmail ? 'success' : 'warning'}`}
                  onClick={() => setEditEmail(!editEmail)}
                >
                  <i className={`bi bi-${editEmail ? 'check' : 'pencil'}`} />
                </button>
              </div>

              <div className="mt-3">
                <span className="badge bg-primary me-2">
                  {user.role.label}
                </span>
                {user.family && (
                  <span className="badge bg-success me-2">
                    Membre de la famille
                  </span>
                )}
                {user.child && (
                  <span className="badge bg-warning me-2">
                    Enfant
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card border-primary">
            <div className="card-body">
              <h4 className="card-title mt-4 text-primary">Modifier le mot de passe</h4>
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
              </div>
              {error && <span className="form-text text-bg-danger badge text-white ">{errorMessage}</span>}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Enregistrer les modifications
        </button>
      </div>
    </form>
  );
}

/*
<figure
  className="figure position-relative d-flex justify-content-center align-items-center"
>
  <img
    src="https://pluspng.com/img-png/github-octocat-logo-vector-png--896.jpg"
    alt="user"
    className="figure-img img-fluid rounded-circle w-25"
  />
  <figcaption className="figure-caption position-absolute bottom-0 bg-opacity-25 bg-dark">
    Change
  </figcaption>
</figure>
<input
  type="file"
  accept="image/*"
  style={{ display: 'none' }}
  ref={fileInputRef}
  onChange={handleFileChange}
/>
*/
