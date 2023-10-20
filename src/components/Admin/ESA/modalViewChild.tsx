import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { IStudent } from '../../../@types/ESA/student';

dayjs.extend(isoWeek);

interface ModalViewDetailsProps {
  student: IStudent;
}

function ModalViewStudent({ student }: ModalViewDetailsProps) {
  return (
    <div className="modal-dialog modal-dialog-centered ">
      <div
        className="modal-content "
      >
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Détails de l&apos;élève
          </h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div
          className="modal-body"
        >
          {student.first_name}
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

export default ModalViewStudent;
