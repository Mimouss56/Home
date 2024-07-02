import { IEntreprise } from '../../@types/Home/ent';

interface EntCardProps {
  ent: IEntreprise;
}

export default function EntCard({ ent }: EntCardProps) {
  const {
    name, urlImg, contact,
  } = ent;

  return (
    <article className="card m-2 bg-light text-dark " style={{ width: '300px' }}>
      <button
        type="button"
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
