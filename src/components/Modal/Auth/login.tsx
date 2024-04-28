import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axios';
import { ISanction } from '../../../@types/Home/sanction';
import { INotif } from '../../../@types/notifToast';

interface IDataNotif { feedback: INotif[], sanction: ISanction[] }

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dataNotifFct = (dataNotif: IDataNotif) => {
    const arrayUnread = [
      ...dataNotif.feedback
        .filter((notif: INotif) => !notif.read)
        .map((feedback: INotif) => ({
          id: feedback.id,
          message: feedback.message,
          name: 'FeedBack',
          read: feedback.read,
          type: 'feedback',
        })),
      ...dataNotif.sanction
        .filter((sanction: ISanction) => !sanction.read)
        .map((sanction: ISanction) => ({
          id: sanction.id,
          message: 'Vous avez une sanction non lue',
          name: 'Sanction',
          read: sanction.read,
          type: 'sanction',
        })),
    ];
    sessionStorage.setItem('dataNotif', JSON.stringify(arrayUnread));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError(false);
      setErrorMessage('');

      const res = await axiosInstance.post('/api/home/login', { username, password });
      const { data, sessionToken, message } = res.data;
      const { dataNotif, ...user } = data;
      // stockage des données dans le sessionStorage

      dataNotifFct(dataNotif);
      sessionStorage.setItem('sessionToken', sessionToken);
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('notifToast', message);
      // on ferme la modal
      const modal = document.getElementById('modalLogin') as HTMLElement;
      modal.classList.remove('show');
      const backdrop = document.querySelector('.modal-backdrop') as HTMLElement;
      backdrop.remove();

      // on affiche le toast
      toast.success(`🦄 ${message} !`);
    } catch (err) {
      const { response } = err as { response: { data: string } };
      setError(true);
      setErrorMessage(response.data);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="modal fade" id="modalLogin" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
      </div>
    </form>
  );
}

export default Login;
