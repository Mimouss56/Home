import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import axiosInstance from '../../utils/axios';
import { BootstrapEvent } from '../../@types/event';
import { ISanction, ISanctionAuthor, ISanctionDate } from '../../@types/sanction';

dayjs.extend(isoWeek);

function ModalViewDetails() {
  const [sanction, setSanction] = useState({} as ISanction);
  const [sanctionID, setSanctionID] = useState(0);
  const [sanctionDate, setSanctionDate] = useState({} as ISanctionDate);
  const [sanctionAuthor, setSanctionAuthor] = useState({} as ISanctionAuthor);
  const [userRoleId, setUserRoleId] = useState(2);
  useEffect(() => {
    const modal = document.getElementById('ModalViewSanction');

    const handleModalShow = (e: Event) => {
      const bootstrapEvent = e as unknown as BootstrapEvent;
      // Cast e.relatedTarget as HTMLElement
      const relatedTarget = bootstrapEvent.relatedTarget as HTMLElement;
      const modalSanctionID = relatedTarget.getAttribute('data-bs-id');
      const roleUser = relatedTarget.getAttribute('data-bs-roleId');
      setSanctionID(Number(modalSanctionID));
      setUserRoleId(Number(roleUser));
    };
    modal?.addEventListener('show.bs.modal', handleModalShow);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/sanction/${sanctionID}`);
      const { data } = response;
      data.label = (userRoleId !== 1 && (dayjs().isoWeek() === data.date.week)) ? '************' : data.label;
      setSanctionDate(data.date);
      setSanction(data);
      setSanctionAuthor(data.author);
    };
    if (sanctionID) fetchData();
  }, [sanctionID, userRoleId]);

  const bgColor = !sanction.warn ? 'bg-warning' : 'bg-danger';

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
          <div
            className={`modal-body ${bgColor} bg-gradient`}
          >
            {sanction.warn && <span className="badge text-bg-warning rounded-pill">Important</span>}
            <p>{sanction.label}</p>
            <p className="text-end fst-italic m-0">
              {`${sanctionAuthor.username} le ${dayjs(sanctionDate.complete).format('DD/MM/YYYY')}`}
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
