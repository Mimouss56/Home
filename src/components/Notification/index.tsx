import { useEffect, useState } from 'react';
import './style.scss';
import { toast } from 'react-toastify';
import { ErrorSanctionProps } from '../../@types/error';
import axiosInstance from '../../utils/axios';
import { INotif } from '../../@types/notifToast';

function Notifications() {
  const [nbNotif, setNbNotif] = useState(0);
  const [listNotif, setListNotif] = useState<INotif[]>([]);
  const [showNotif, setShowNotif] = useState(false);

  const handleReadNotif = (id: number, type: string) => {
    try {
      axiosInstance.put(`/api/home/${type}/${id}/read`, { read: true });
      const newListNotif = listNotif.filter((notif) => notif.id !== id);
      setListNotif(newListNotif);
      setNbNotif(newListNotif.length);
      sessionStorage.setItem('dataNotif', JSON.stringify(newListNotif));
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };
  useEffect(() => {
    const updateNotifications = () => {
      const dataNotif = JSON.parse(sessionStorage.getItem('dataNotif') || '[]') as INotif[];
      setListNotif(dataNotif);
      setNbNotif(dataNotif.length);
    };
    // Mettre à jour les notifications lorsqu'il y a un nouvel événement de connexion
    document.addEventListener('newLogin', () => updateNotifications());
    // on remove le addEventListener
    updateNotifications();
    return () => {
      document.removeEventListener('newLogin', () => updateNotifications());
    };
  }, []);
  if (listNotif.length === 0) return null;

  return (
    <div className="position-fixed" style={{ bottom: '15%', right: '25px' }}>
      <div className="position-relative">
        {showNotif && (
          <div className="position-absolute" style={{ bottom: '100%', right: '0' }}>
            {listNotif.map((notif: INotif, index: number) => (
              <div
                key={notif.id}
                className="card card-body bg-light mt-2"
                style={{
                  width: '300px',
                  animation: `slidein ${(listNotif.length - index) * 0.2}s forwards`,
                }}
              >
                <h5 className="card-title d-flex justify-content-between">
                  {notif.name}
                  <button
                    type="button"
                    className="btn bi bi-envelope-open text-success"
                    onClick={() => handleReadNotif(notif.id, notif.type)}
                  />

                </h5>
                <p className="card-text">{notif.message}</p>
              </div>
            ))}
          </div>
        )}
        {nbNotif !== 0 && (
          <div className="shake badge bg-warning border border-warning-subtle text-warning-emphasis rounded-circle">
            <button
              type="button"
              className="btn btn-inline-warning position-relative"
              onClick={() => setShowNotif(!showNotif)}
            >
              <i className="bi bi-bell" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {nbNotif}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </div>

        )}

      </div>
    </div>
  );
}

export default Notifications;
