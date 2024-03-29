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
    <article className="card m-2 bg-light text-dark " style={{ width: '300px' }}>
      {user && user.username === 'Mouss' && (
        <button
          type="button"
          className="bi bi-gear text-danger btn position-absolute top-0 end-0 "
          data-bs-toggle="modal"
          data-bs-target="#addEntModal"
          data-bs-id-ent={id}
          data-bs-type="ent"
        />
      )}
      <button
        type="button"
        onClick={onClick}
        className="card-body border-0 bg-none"

      >
        <img
          className="card-img-top m-auto"
          src={urlImg}
          alt={name}
          style={{ maxWidth: '150px', maxHeight: '75px' }}
        />
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{`Contacts: ${contact?.length}`}</p>
          <p className="card-text">{`Interactions: ${contact?.flatMap((c) => c.interaction).length}`}</p>
        </div>

      </button>
    </article>
  );
}

export default EntCard;
