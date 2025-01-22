import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { toast } from 'react-toastify';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/fr';

import { ISanction } from '../../../@types/Home/sanction';
import axiosInstance from '../../../utils/axios';
import { INotif } from '../../../@types/notifToast';
import { sanctionsContext } from '../../../store/sanction.context';
import useMeStore from '../../../store/me.store';

dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);

function ModalViewDetails() {
  const viewItemModal = useRef<HTMLDivElement>(null);

  const { sanctions } = useContext(sanctionsContext);
  const [sanction, setSanction] = useState<ISanction>();
  const dataNotif = JSON.parse(sessionStorage.getItem('dataNotif') || '[]') as INotif[];
  const { me: user } = useMeStore((state) => state);

  useEffect(() => {
    const modalElement = viewItemModal?.current;

    const retrieveSanction = async (id: number) => {
      const dataSanction = sanctions.find((oneSanction) => oneSanction.id === id);
      if (!dataSanction) return;
      if (
        user?.role.id !== 1
        && dayjs(dataSanction.created_at).isoWeek() >= dayjs().isoWeek()
        && dayjs(dataSanction.created_at).year() >= dayjs().year()) {
        dataSanction.label = '**********';
        setSanction(dataSanction);
      }
    };

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

    if (modalElement) {
      modalElement.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const idModal = button.getAttribute('data-bs-id');
        if (Number(idModal) !== 0) {
          if (user) retrieveSanction(Number(idModal));
          if (user?.role.id !== 1) handleRead(Number(idModal));
        }
      });
    }
    // on remove le addEventListener
    return () => {
      if (modalElement) {
        modalElement.removeEventListener('show.bs.modal', () => { });
      }
    };
  }, [dataNotif, sanctions, user]);

  if (sanction === undefined) return null;

  return (
    <div className="modal fade" id="modalViewSanction" ref={viewItemModal}>
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
              {`le ${dayjs(sanction.created_at).locale('fr').format('LLLL')}`}
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
