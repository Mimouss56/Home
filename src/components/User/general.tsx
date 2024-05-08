import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { IAvatarWithoutObject } from '../../@types/Home/user';
import axiosInstance from '../../utils/axios';
import FileUploader from '../fileUploader';
import { ErrorAxios } from '../../@types/error';
import useImageUpload from '../../hook/utils/useImageUpload';
import useFormInput from '../../hook/useFormInput';
import { userContext } from '../../store/user.context';

function InfosUser() {
  const { user } = useContext(userContext);
  const initData = {
    last_name: user?.last_name || '',
    first_name: user?.first_name || '',
    email: user?.email,
  };
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [imageFile, setImageFile] = useState<IAvatarWithoutObject | null>(null);
  const { resetImageUpload } = useImageUpload();
  const { form, handleChange } = useFormInput(initData);
  const handleChangeFile = (file: IAvatarWithoutObject) => {
    setImageFile(file);

    try {
      axiosInstance.put(`/api/home/user/${user?.id}`, { main: true, avatar: file.id });
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

    // On met à jour les infos du user par la route /user/:id
    try {
      const response = await axiosInstance.put(
        `/api/home/user/${user?.id}`,
        { ...form, main: true },
      );
      toast.info(response.data.message);
      // On met à jour le user dans le sessionStorage
      const newUser = {
        ...user,
        ...form,
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
    if (user?.avatar?.path !== imageFile?.path) {
      setImageFile(imageFile);
    }
  }, [user, imageFile, setImageFile]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="card border-white">
        <div className="card-body">
          <h4 className="card-title text-dark">
            {`Informations Générales de ${user?.username}`}
          </h4>
          <FileUploader submit={handleChangeFile} img={user?.avatar?.path || ''} />

          <div className="input-group mb-3">
            <span className="input-group-text" id="Nom">
              Nom
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={form.last_name}
              aria-label="last_name"
              aria-describedby="Nom"
              value={form.last_name}
              name="last_name"
              disabled={!editName}
              onChange={handleChange}
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
              placeholder={form.first_name}
              aria-label="first_name"
              aria-describedby="Prénom"
              name="first_name"
              value={form.first_name}
              disabled={!editName}
              onChange={handleChange}
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
              placeholder={form.email}
              aria-label="Email"
              aria-describedby="Email"
              value={form.email}
              name="email"
              disabled={!editEmail}
              onChange={handleChange}
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
              {user?.role.label}
            </span>
            {user?.family && (
              <span className="badge bg-success me-2">
                Membre de la famille
              </span>
            )}
            {user?.child && (
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
