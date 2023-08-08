import { ICard } from '../../@types/card';
import Badge from './Badge';

function ModalCard({
  title, date, desc, competences,
}: ICard) {
  return (
    <div className="modal fade" id={title.replaceAll(' ', '-')} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body ">
            <div className="d-flex flex-wrap justify-content-evenly py-0">

              {competences.map((competence: string) => (
                <Badge key={competence} name={competence} />
              ))}
            </div>
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCard;