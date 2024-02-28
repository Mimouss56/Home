import { useState } from 'react';
import { IContact, IEntreprise, IInteraction } from '../../@types/Home/ent';
import DetailsInteraction from './viewInteraction';
import AddContactModal from '../../components/Modal/Ent/formContact';
import DetailsContact from './viewContact';
import ModalAddInteraction from '../../components/Modal/Ent/formInteraction';

function DetailsEntreprise({ ent }: { ent: IEntreprise }) {
  const [entreprise, setEntreprise] = useState(ent);
  const [filteredInteraction, setFilteredInteraction] = useState(
    entreprise.contact.flatMap((contact) => contact.interaction),
  );
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [idContact, setIdContact] = useState(0);

  const handleAddInteractionOfUser = (data: IInteraction) => {
    setFilteredInteraction(
      (prev) => [...prev, data],
    );
  };

  const handleAddContact = (data: IContact) => {
    setEntreprise((prevEntreprise) => {
      const updatedContacts = [...prevEntreprise.contact, data];

      return {
        ...prevEntreprise,
        contact: updatedContacts,
      };
    });
  };
  if (!entreprise) {
    return <div>Aucune entreprise de trouvé ...</div>;
  }

  return (
    <div className="d-flex flex-sm-column flex-wrap">
      {/* Title */}
      <h2>{`Détails de ${entreprise.name}`}</h2>
      {/* Content */}
      <div className="row d-sm-flex flex-sm-wrap flex-sm-column">
        <div className="d-sm-flex flex-sm-column col-lg-3">
          <img src={entreprise.urlImg} alt={entreprise.name} className="img-fluid" width="150px" />
          <i>{`${entreprise.address}, ${entreprise.postalCode} ${entreprise.town}`}</i>
          <h3>Contact</h3>
          <ul>
            {entreprise.contact.map((contact) => (
              <li
                key={contact.id}
              >
                <button
                  type="button"
                  className="btn btn-link"
                  itemID={contact.id.toString()}
                  onClick={() => {
                    setFilteredInteraction(contact.interaction);
                    setShowContactDetails(true);
                    setIdContact(contact.id);
                  }}
                >
                  {`${contact.nom} ${contact.prenom}`}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="badge d-flex align-items-center p-1 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill w-25 mb-2"
            data-bs-toggle="modal"
            data-bs-target="#addContact"
            data-bs-id-ent={entreprise.id}
          >
            <i className="bi bi-plus-circle-fill" />
            <span className="vr mx-2" />
            <span>Ajout</span>
          </button>
        </div>
        <div className="col-lg-9 d-sm-flex flex-sm-column">
          {showContactDetails && idContact && (
            <DetailsContact contact={
              entreprise.contact.find((contact) => contact.id === idContact) as IContact
            }
            />
          )}
          <DetailsInteraction interactions={filteredInteraction} />
          {idContact !== 0 && (
            <div className="mt-3 d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addInteraction"
                data-bs-id-contact={idContact}
              >
                Ajouter une interaction
              </button>
            </div>
          )}

        </div>
      </div>
      <ModalAddInteraction onAddElement={handleAddInteractionOfUser} />
      <AddContactModal onAddElement={handleAddContact} />
    </div>
  );
}

export default DetailsEntreprise;
