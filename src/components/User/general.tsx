import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IAvatarWithoutObject } from '../../@types/Home/user';
import axiosInstance from '../../utils/axios';
import FileUploader from '../fileUploader';
import { ErrorAxios } from '../../@types/error';
import useImageUpload from '../../hook/utils/useImageUpload';

interface IDataInput {
  last_name: string;
  first_name: string;
  email: string;
}
function InfosUser() {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageFile, setImageFile] = useState<IAvatarWithoutObject | null>(null);
  const {
    resetImageUpload,
  } = useImageUpload();
  const handleChangeFile = (file: IAvatarWithoutObject) => {
    setImageFile(file);

    try {
      axiosInstance.put(`/api/home/user/${user.id}`, { avatar: file.id });
      const newUser = {
        ...user,
        avatar: file,
      };

      sessionStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      const errorAxios = err as AxiosError;
      const errorData = errorAxios.response?.data as ErrorAxios;
      toast.warning(
        errorData?.message
        || "Une erreur s'est produite lors de l'upload de l'image.",
      );
    }
    // on modifie le sessionStorage pour mettre à jour l'image
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataInput: IDataInput = {
      last_name: lastName || user.last_name,
      first_name: firstName || user.first_name,
      email: email || user.email,
    };

    // On met à jour les infos du user par la route /user/:id
    try {
      const response = await axiosInstance.put(
        `/api/home/user/${user.id}`,
        { ...dataInput, main: true },
      );
      toast.info(response.data.message);
      // On met à jour le user dans le sessionStorage
      const newUser = {
        ...user,
        ...dataInput,
      };
      sessionStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      const errorAxios = err as AxiosError;
      const errorData = errorAxios.response?.data as ErrorAxios;
      toast.warning(
        errorData?.message
        || "Une erreur s'est produite lors de l'upload de l'image.",
      );
    }

    setEditName(false);
    setEditEmail(false);
    resetImageUpload();
  };

  useEffect(() => {
    if (user.avatar !== imageFile?.path) {
      setImageFile(imageFile);
    }
  }, [user.avatar, imageFile, setImageFile]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="card border-white">
        <div className="card-body">
          <h4 className="card-title text-dark">
            {`Informations Générales de ${user.username}`}
          </h4>
          <FileUploader submit={handleChangeFile} img={user.avatar?.path || ''} />

          <div className="input-group mb-3">
            <span className="input-group-text" id="Nom">
              Nom
            </span>
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
            {!editName && (
              <button
                type="button"
                className="input-group-text text-bg-warning"
                onClick={() => setEditName(!editName)}
              >
                <i className="bi bi-pencil" />
              </button>
            )}
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="Prénom">
              Prénom
            </span>
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
            {!editName && (
              <button
                type="button"
                className="input-group-text text-bg-warning"
                onClick={() => setEditName(!editName)}
              >
                <i className="bi bi-pencil" />
              </button>
            )}
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="Email">
              Email
            </span>
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
            {!editEmail && (
              <button
                type="button"
                className="input-group-text text-bg-warning"
                onClick={() => setEditEmail(!editEmail)}
              >
                <i className="bi bi-pencil" />
              </button>
            )}
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
              <span className="badge bg-warning me-2">Enfant</span>
            )}
          </div>
        </div>
        <div className="card-footer text-end">
          <button type="submit" className="btn btn-primary">
            Enregistrer
          </button>

        </div>
      </div>
    </form>
  );
}

export default InfosUser;
