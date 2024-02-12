import { IContact } from '../../../../@types/Home/ent';

function DetailsContact({ contact }: { contact: IContact }) {
  return (
    <div>
      <h3>{`${contact.nom} ${contact.prenom}`}</h3>
      <div>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        <p>{contact.role}</p>

      </div>
    </div>
  );
}

export default DetailsContact;
