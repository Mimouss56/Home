import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/fr';

import { ISanction } from '../../@types/Home/sanction';
import axiosInstance from '../../utils/axios';
import { INotif } from '../../@types/notifToast';

dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);

function ModalViewDetails() {
  const [sanction, setSanction] = useState<ISanction>({} as ISanction);
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const dataNotif = JSON.parse(sessionStorage.getItem('dataNotif') || '[]') as INotif[];

  const fetchData = async (id: number, idRole: number) => {
    try {
      const { data } = await axiosInstance.get(`/api/home/sanction/${id}`);
      if (
        idRole !== 1
        && data.date.week >= dayjs().isoWeek()
        && data.date.year >= dayjs().year()) {
        data.label = '**********';
      }
      setSanction(data);
    } catch (error) {
      toast.error('Erreur lors de la récupération des données de la sanction à éditer');
    }
  };

  const handleRead = async (id: number) => {
    try {
      await axiosInstance.put(`/api/home/notif/${id}`);
      const updatedData = dataNotif.map((notif) => {
        if (notif.id === id) {
          return { ...notif, read: true };
        }
        return notif;
      });
      sessionStorage.setItem('dataNotif', JSON.stringify(updatedData));
    } catch (error) {
      toast.error(`Erreur lors de la lecture de la notification: ${error}`);
    }
  };

  useEffect(() => {
    const addItemModal = document.getElementById('modalViewSanction');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const idModal = button.getAttribute('data-bs-id');
        if (Number(idModal) !== 0) fetchData(Number(idModal), user.role.id);
      });
    }
    // on remove le addEventListener
    return () => {
      if (addItemModal) {
        addItemModal.removeEventListener('show.bs.modal', () => {});
      }
    };
  }, [user.role.id]);

  if (user.role.id !== 1) handleRead(sanction.id);

  return (
    <div className="modal fade" id="modalViewSanction">
      <div className="modal-dialog modal-dialog-centered ">
        <div
          className={`modal-content ${sanction.warn ? 'bg-danger' : 'bg-warning'} bg-gradient`}
        >
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Détails de la sanction
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div
            className={`modal-body ${!sanction.warn ? 'bg-warning' : 'bg-danger'} bg-gradient`}
          >
            {sanction.warn && <span className="badge text-bg-warning rounded-pill">Important</span>}
            <p>{sanction.label}</p>
            <p className="text-end fst-italic m-0">
              {`Par : ${sanction.author?.username}`}
            </p>
            <p className="text-end fst-italic m-0">
              {`le ${dayjs(sanction.date?.complete).locale('fr').format('LLLL')}`}
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-around ">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalViewDetails;
