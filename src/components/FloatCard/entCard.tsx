/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { IEntreprise } from '../../@types/Home/ent';

interface EntCardProps {
  ent: IEntreprise;
  onClick: () => void;
}

const user = JSON.parse(sessionStorage.getItem('user') || '{}');
function EntCard({ ent, onClick }: EntCardProps) {
  const {
    id, name, urlImg, contact,
  } = ent;
  return (
    <div className="card w-25 m-2 bg-light text-dark ">
      {user && user.username === 'Mouss' && (
        <button
          type="button"
          className="bi bi-gear text-danger btn position-absolute top-0 end-0 "
          data-bs-toggle="modal"
          data-bs-target="#addItem"
          data-bs-id={id}
          data-bs-edit="true"
          data-bs-type="ent"
        />
      )}
      <div onClick={onClick}>
        <img
          className="card-img-top"
          src={urlImg}
          alt={name}
          style={{ maxWidth: '150px', margin: 'auto', maxHeight: '75px' }}
        />
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{`Nombre de contacts: ${contact.length}`}</p>
          <p className="card-text">{`Nombre d'interactions: ${contact.flatMap((c) => c.interaction).length}`}</p>
        </div>

      </div>
    </div>
  );
}

export default EntCard;
