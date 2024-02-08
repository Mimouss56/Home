import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IEntreprise } from '../../../../@types/Home/ent';
import axiosInstance from '../../../../utils/axios';
import { ErrorSanctionProps } from '../../../../@types/error';
import DetailsInteraction from './viewInteraction';
import AddContactModal from '../../../../components/Modal/Ent/formContact';

function DetailsEntreprise({ idEnt }: { idEnt: string }) {
  const [entreprise, setEntreprise] = useState<IEntreprise | null>(null);
  const [showInteration, setShowInteration] = useState(false);
  const [idContact, setIdContact] = useState(0);

  const fetchEntreprise = async (id: number) => {
    try {
      const data = await axiosInstance.get(`/api/home/suivi/ent/${id}`);
      setEntreprise(data.data);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleShowInteration = (id: number) => {
    setShowInteration(!showInteration);
    setIdContact(id);
  };

  useEffect(() => {
    fetchEntreprise(Number(idEnt));
  }, [idEnt]);

  if (!entreprise) {
    return <div>Aucune entreprise de trouvé ...</div>;
  }

  return (
    <div>
      <h2>{`Détails de ${entreprise.name}`}</h2>
      <div className="row">
        <div className="col-3 d-flex flex-column">
          <img src={entreprise.urlImg} alt={entreprise.name} className="img-fluid" width="150px" />
          <i>{`${entreprise.adress}, ${entreprise.postalCode} ${entreprise.town}`}</i>
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
                    handleShowInteration(contact.id);
                  }}
                >
                  {`${contact.nom} ${contact.prenom}`}
                </button>
              </li>
            ))}
          </ul>
          <AddContactModal
            idEnt={entreprise.id}
            onAddElement={() => fetchEntreprise(entreprise.id)}
          />
        </div>
        {showInteration && (
          <div className="col-9">
            <DetailsInteraction idContact={idContact} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailsEntreprise;
