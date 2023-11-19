import { ICard } from '../../@types/Home/card';
import Badge from '../FloatCard/Badge';

function viewJob({
  title, desc, competences, id,
}: ICard) {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  return (
    <div className="modal fade" id={title.replaceAll(' ', '-')} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body ">
            {desc}
          </div>
          <div className="modal-footer">
            <div className="d-flex flex-wrap justify-content-evenly py-0">

              {competences.map((competence: string) => (
                <Badge key={competence} name={competence} />
              ))}
            </div>
            {user && (
              <button
                type="button"
                className="bi bi-gear text-danger btn"
                data-bs-toggle="modal"
                data-bs-id={id}
                data-bs-target="#addItem"
              />

            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default viewJob;
