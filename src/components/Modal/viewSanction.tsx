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

const initFormData = {
  id: 0,
  label: '',
  author: {
    id: 0,
    username: '',
    email: '',
  },
  date: {
    year: 0,
    week: 0,
    complete: '',
  },
  child: {
    id: 0,
    username: '',
  },
  warn: false,
  read: false,
};

function ModalViewDetails() {
  const [sanction, setSanction] = useState<ISanction>(initFormData);
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const fetchData = async (id: number, idRole: number) => {
    const dataNotif = JSON.parse(sessionStorage.getItem('dataNotif') || '[]') as INotif[];
    try {
      const { data } = await axiosInstance.get(`/api/home/sanction/${id}`);
      if (idRole !== 1 && data.date.week >= dayjs().isoWeek() && data.date.year >= dayjs().year()) {
        data.label = '**********';
      }
      // update dataNotif in sessionStorage
      await axiosInstance.put(`/api/home/sanction/${data.id}/read`, { read: true });
      const newListNotif = dataNotif.filter((notif) => notif.id !== id);
      sessionStorage.setItem('dataNotif', JSON.stringify(newListNotif));

      setSanction(data);
    } catch (error) {
      toast.error('Erreur lors de la récupération des données de la sanction à éditer');
    }
  };

  useEffect(() => {
    const addItemModal = document.getElementById('modalViewSanction');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const idModal = button.getAttribute('data-bs-id');
        fetchData(Number(idModal), user.role.id);
      });
    }
  }, [user.role.id]);

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
              {`Par : ${sanction.author.username}`}
            </p>
            <p className="text-end fst-italic m-0">
              {`le ${dayjs(sanction.date.complete).locale('fr').format('LLLL')}`}
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
