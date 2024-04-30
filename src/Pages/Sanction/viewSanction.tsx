import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/fr';

import { ISanction } from '../../@types/Home/sanction';
import axiosInstance from '../../utils/axios';
import { INotif } from '../../@types/notifToast';
import useUserStore from '../../store/user.store';

dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);

function ModalViewDetails() {
  const [sanction, setSanction] = useState<ISanction>({} as ISanction);
  const user = useUserStore((state) => state.user);
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

  useEffect(() => {
    const handleRead = async (id: number) => {
      try {
        await axiosInstance.put(`/api/home/sanction/${id}/read`);
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
    const addItemModal = document.getElementById('modalViewSanction');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const idModal = button.getAttribute('data-bs-id');
        if (Number(idModal) !== 0) {
          fetchData(Number(idModal), user.role.id);
          if (user.role.id !== 1) handleRead(Number(idModal));
        }
      });
    }
    // on remove le addEventListener
    return () => {
      if (addItemModal) {
        addItemModal.removeEventListener('show.bs.modal', () => { });
      }
    };
  }, [user.role.id, dataNotif]);

  return (
    <div className="modal fade" id="modalViewSanction">
      <div className="modal-dialog modal-dialog-centered ">
        <div
          className={`modal-content ${sanction.warn ? 'bg-danger-subtle' : 'bg-warning-subtle'} bg-gradient text-dark`}
        >
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Détails de la sanction
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            {sanction.warn && <span className="badge text-bg-danger rounded-pill ">Important</span>}
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
