import { IContact } from '../../@types/Home/ent';

function DetailsContact({ contact }: { contact: IContact }) {
  return (
    <div>
      <h3>
        {`${contact.nom} ${contact.prenom} `}
        <i>{` (${contact.role})`}</i>

      </h3>
      <div>
        <div className="input-group mb-3 w-25">
          <span className="input-group-text" id="prefixId">
            <a href={`mailto:${contact.email}`}>
              <i className="bi bi-envelope" />
            </a>
          </span>
          <input
            type="text"
            className="form-control"
            aria-describedby="prefixId"
            value={contact.email}
            readOnly
          />
        </div>
        <div className="input-group mb-3 w-25">
          <span className="input-group-text" id="prefixId">
            <a href={`tel:+33${contact.phone}`}>
              <i className="bi bi-phone" />
            </a>
          </span>
          <input
            type="text"
            className="form-control"
            aria-describedby="prefixId"
            value={contact.phone}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsContact;
