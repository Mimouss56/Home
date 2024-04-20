/* eslint-disable max-len */
import DetailsContact from '../../Pages/Emploi/viewContact';
import { IContact } from '../../@types/Home/ent';

function ContactCollapse({ contact, onClick }: { contact: IContact, onClick: (e: any) => void }) {
  return (
    <>
      <button
        className="list-group-item list-group-item-action w-100 rounded-0 border-1"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse_${contact.id}`}
        aria-expanded="false"
        aria-controls="collapseExample"
        onClick={onClick}
      >
        {`${contact.nom} ${contact.prenom}`}
      </button>
      <div className="collapse" id={`collapse_${contact.id}`}>
        <DetailsContact contact={contact} />
      </div>
    </>
  );
}

export default ContactCollapse;
