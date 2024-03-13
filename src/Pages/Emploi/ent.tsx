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
    <div className="d-flex flex-wrap">
      {/* 1er colonne */}
      <div className="d-flex flex-wrap col-lg-3">

        {/* details ENT */}
        <div className="d-flex flex-column flex-wrap m-auto">
          <h2>{`Détails de ${entreprise.name}`}</h2>
          <img src={entreprise.urlImg} alt={entreprise.name} className="img-fluid m-auto" width="150px" />
          <i>{`${entreprise.address}, ${entreprise.postalCode} ${entreprise.town}`}</i>
        </div>

        {/* Contact Details */}
        <div className="d-flex flex-column flex-wrap w-100 ">
          <h3>Contact</h3>
          <div className="list-group mb-2">
            {entreprise.contact.map((contact) => (
              <button
                key={contact.id}
                type="button"
                className="list-group-item list-group-item-action w-100 rounded-0 border-1"
                itemID={contact.id.toString()}
                onClick={() => {
                  setFilteredInteraction(contact.interaction);
                  setShowContactDetails(true);
                  setIdContact(contact.id);
                }}
              >
                {`${contact.nom} ${contact.prenom}`}
              </button>
            ))}
          </div>
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

          {showContactDetails && idContact && (
            <DetailsContact contact={
              entreprise.contact.find((contact) => contact.id === idContact) as IContact
            }
            />
          )}

        </div>
      </div>

      <div className="col-lg-9">

        <DetailsInteraction interactions={filteredInteraction} />
        {idContact !== 0 && (
          <div className="mt-3 text-end ">
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
      <ModalAddInteraction onAddElement={handleAddInteractionOfUser} />
      <AddContactModal onAddElement={handleAddContact} />
    </div>
  );
}

export default DetailsEntreprise;
