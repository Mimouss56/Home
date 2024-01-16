import { useEffect, useState } from 'react';
import './style.scss';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ErrorSanctionProps } from '../../@types/error';
import axiosInstance from '../../utils/axios';

interface Inotif {
  id: number;
  name: string;
  message: string;
  draft: boolean;
  read: boolean;
}

function Notifications() {
  const [nbNotif, setNbNotif] = useState(0);
  const [listNotif, setListNotif] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const handleReadNotif = (id: number) => {
    try {
      axiosInstance.put(`/feedback/${id}`, { read: true });
      const newNotif = [...listNotif];
      setListNotif(newNotif);
      setNbNotif(newNotif.filter((n: Inotif) => !n.read).length);
      sessionStorage.setItem('dataNotif', JSON.stringify(newNotif));
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const dataNotif = JSON.parse(sessionStorage.getItem('dataNotif') || '[]');
    if (dataNotif && user && user.family) {
      setListNotif(dataNotif);
      setNbNotif(dataNotif.filter((notif: Inotif) => !notif.read).length);
    }
  }, []);

  if (!listNotif.length || nbNotif === 0) return null;

  return (
    <div className="position-fixed" style={{ bottom: '15%', right: '25px' }}>
      <div className="position-relative">
        {showNotif && (
          <div className="position-absolute" style={{ bottom: '100%', right: '0' }}>
            {listNotif.map((notif: Inotif, index: number) => (
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
                    onClick={() => handleReadNotif(notif.id)}
                  />

                </h5>
                <p className="card-text">{notif.message}</p>
              </div>
            ))}
          </div>
        )}

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
      </div>
    </div>
  );
}

export default Notifications;
