import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ISanction } from '../../@types/Home/sanction';
import axiosInstance from '../../utils/axios';

dayjs.extend(isoWeek);

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

  const fetchData = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/api/home/sanction/${id}`);
      setSanction(response.data);
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
        fetchData(Number(idModal));
      });
    }
  }, []);

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
              {`${sanction.author.username} le ${new Date(sanction.date.complete).toLocaleDateString()}`}
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
