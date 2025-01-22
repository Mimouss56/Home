import { useContext, useState } from 'react';
import { IContact, IInteraction } from '../../@types/Home/ent';
import DetailsInteraction from './viewInteraction';
import AddContactModal from '../../components/Modal/Ent/form/formContact';
import ModalAddInteraction from '../../components/Modal/Ent/form/formInteraction';
import ContactCollapse from '../../components/CollapseContact';
import { entContext } from '../../store/ent.context';
import AddEntModal from '../../components/Modal/Ent/form/formEntSuivi';
import useMeStore from '../../store/me.store';

function DetailsEntreprise({ id }: { id: number }) {
  const { ent, setEnt } = useContext(entContext);
  const { me: user } = useMeStore((state) => state);
  // on filtre l'entreprise par son id
  const entreprise = ent.find((e) => e.id === id);
  const [idContact, setIdContact] = useState(0);
  if (!entreprise) return null;

  const handleAddContact = (data: IContact) => {
    // add contact to entreprise
    entreprise.contact?.push(data);
    setEnt([...ent]);
    // entreprise.contact.push(data);
  };

  const handleShowContact = (e: Event) => {
    setIdContact(Number((e.target as HTMLElement).getAttribute('data-bs-id-contact')));
  };

  const handleAddInteractionOfUser = (data: IInteraction) => {
    // add interaction to contact
    const contact = entreprise.contact?.find((c) => c.id === data.id);
    if (contact) {
      contact.interaction?.push(data);
      // on met à jour le contact dans l'entreprise
      entreprise.contact = entreprise.contact?.map((c) => (c.id === contact.id ? contact : c));
    }
  };

  return (
    <section
      className="d-flex flex-wrap mx-auto w-100 pt-5 row min-h-100 min-vh-100 "
    // style={{ height: '100vp' }}
    >

      {/* 1er colonne */}
      <div className="d-flex flex-column col-xs-12 col-lg-3 px-3 h-lg-100">
        <button
          type="button"
          className="btn btn-primary mb-2 w-50 mx-auto"
          onClick={() => window.history.back()}
        >
          <i className="bi bi-box-arrow-up-left" />
          Retour à la liste
        </button>
        {/* Card ENT */}
        <div className="d-flex flex-column flex-wrap mb-5 bg-secondary-subtle text-dark rounded p-2 position-relative">
          {user?.username === 'Mouss' && (
            <button
              type="button"
              className="bi bi-gear text-danger btn position-absolute top-0 end-0 "
              data-bs-toggle="modal"
              data-bs-target="#addEntModal"
              data-bs-id-ent={id}
              data-bs-type="ent"
            />
          )}
          <img
            src={entreprise.urlImg}
            alt={entreprise.name}
            className="img-fluid m-auto my-4"
            width="150px"
          />
          <i>{`${entreprise.address},`}</i>
          <i>{` ${entreprise.postalCode} ${entreprise.town}`}</i>
        </div>

        {/* Contact Details */}
        <div className="d-flex flex-column flex-wrap w-100 mb-5">
          <div className="d-flex flex-wrap justify-content-between ">
            <h3>Contact</h3>

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
          <div className="list-group mb-2">
            {entreprise.contact?.map((contact) => (
              <ContactCollapse
                key={contact.id}
                contact={contact}
                onClick={handleShowContact}
              />
            ))}
          </div>

        </div>

      </div>

      {/* 2eme colonne */}

      <div className="col-lg-9 h-100">

        <DetailsInteraction
          interactions={
            idContact === 0
              ? entreprise.contact?.flatMap((contact) => contact.interaction) || []
              : entreprise.contact?.filter((c) => c.id === idContact)[0]?.interaction || []
          }
        />
        {
          idContact !== 0 && (
            <button
              type="button"
              className="btn btn-primary mx-4"
              data-bs-toggle="modal"
              data-bs-target="#addInteraction"
              data-bs-id-contact={idContact}
            >
              Ajouter une interaction
            </button>
          )
        }

      </div>

      <ModalAddInteraction onAddElement={handleAddInteractionOfUser} />
      <AddContactModal onAddElement={handleAddContact} />
      <AddEntModal />

    </section>
  );
}

export default DetailsEntreprise;
