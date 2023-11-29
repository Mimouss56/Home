import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { ISanction } from '../../@types/Home/sanction';

dayjs.extend(isoWeek);

interface ModalViewDetailsProps {
  sanction: ISanction;
}

function ModalViewDetails({ sanction }: ModalViewDetailsProps) {
  const bgColor = !sanction.warn ? 'bg-warning' : 'bg-danger';

  return (
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
          className={`modal-body ${bgColor} bg-gradient`}
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
  );
}

export default ModalViewDetails;
