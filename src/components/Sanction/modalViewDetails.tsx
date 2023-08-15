import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { BootstrapEvent } from '../../@types/event';
import { ISanction } from '../../@types/sanction';

function ModalViewDetails() {
  const [sanction, setSanction] = useState({} as ISanction);
  const [sanctionID, setSanctionID] = useState(0);
  useEffect(() => {
    const modal = document.getElementById('ModalViewSanction');

    const handleModalShow = (e: Event) => {
      const bootstrapEvent = e as unknown as BootstrapEvent;
      // Cast e.relatedTarget as HTMLElement
      const relatedTarget = bootstrapEvent.relatedTarget as HTMLElement;
      const modalSanctionID = relatedTarget.getAttribute('data-bs-id');
      setSanctionID(Number(modalSanctionID));
    };
    modal?.addEventListener('show.bs.modal', handleModalShow);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/sanction/${sanctionID}`);
      const { data } = response;
      console.log(data);
      setSanction(data);
    };
    if (sanctionID) fetchData();
  }, [sanctionID]);

  const bgColor = sanction.warn ? 'bg-warning' : 'bg-danger';

  return (
    <div
      className="modal fade "
      id="ModalViewSanction"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered ">
        <div
          className={`modal-content ${bgColor}`}
        >
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Détails de la sanction
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className={`modal-body ${bgColor} bg-gradient`}>
            {sanction.warn && <span className="badge text-bg-danger rounded-pill">Important</span>}
            <p>{sanction.label}</p>
          </div>
          <div className="modal-footer d-flex justify-content-around">
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
