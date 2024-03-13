import { useEffect, useState } from 'react';
import { IEntreprise, IInterVue } from '../../@types/Home/ent';
import AddEntModal from '../../components/Modal/Ent/formEntSuivi';
import EntCard from '../../components/FloatCard/entCard';
import DetailsEntreprise from './ent';
import ListInterations from './listingInter';
import useFetchData from '../../hook/useFetchData';

function EntPage() {
  const [emplois, setEmplois] = useState<IEntreprise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmplois, setFilteredEmplois] = useState<IEntreprise[]>([]);
  const [entID, setEntID] = useState(0);
  const [showList, setShowList] = useState(true);
  const [filteredInteraction, setFilteredInteraction] = useState<IInterVue[]>([]);
  // const [showLastInter, setShowLastInter] = useState<IInterVue[]>([]);

  const [data] = useFetchData('/api/home/ent');
  const listEnt = data as IEntreprise[];

  const fetchLastInter = (listingEnt: IEntreprise[]) => {
    // on filtre la derniere interaction en date de chaque entreprise
    const lastInters: IInterVue[] = [];
    listingEnt.forEach((ent) => {
      ent.contact?.forEach((contact) => {
        const lastInter = contact.interaction[contact.interaction.length - 1];
        // si la date de la derniere interaction est supérieur on, passe

        if (!lastInter) {
          return;
        }
        const returnValue = {
          ...lastInter,
          entreprise: ent.name,
          contact: `${contact.nom} ${contact.prenom}`,
        };
        lastInters.push(returnValue);
      });
    });
    setFilteredInteraction(lastInters);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntID(0);
    setShowList(true);
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = emplois.filter(
      (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredEmplois(filtered);
    fetchLastInter(filtered);
  };

  const handleShowDetails = (idEntreprise: number) => {
    setEntID(Number(idEntreprise));
    setShowList(false);
  };

  const fetchEnt = (allEnt: IEntreprise[]) => {
    setEmplois(allEnt);
    setFilteredEmplois(allEnt);
  };

  useEffect(() => {
    fetchEnt(listEnt);
    fetchLastInter(listEnt);
  }, [listEnt]);

  return (
    <>
      {/* //barre de recherche d'une entreprise */}
      <section>
        <h1>Suivi Candidature</h1>
        {/* //barre de recherche d'une entreprise */}
        <div className="input-group mb-3 w-50 m-auto">
          <span className="input-group-text" id="search-ent">
            <i className="bi bi-search" />
          </span>
          <input
            type="search"
            className="form-control"
            placeholder="Entreprise"
            aria-label="Entreprise"
            aria-describedby="search-ent"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* Afficher le bouton "Ajouter" seulement si la recherche ne retourne aucun résultat */}
          {filteredEmplois.length === 0 && (
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addEntModal"
              data-bs-id={0}
            >
              Ajouter
            </button>
          )}
        </div>

      </section>
      {/* Liste des entreprises */}
      {showList && (
        <section className="d-flex flex-row">
          <div className="col-7">
            {filteredEmplois && (
              <div className="d-flex flex-wrap justify-content-evenly ">
                {filteredEmplois.map((item) => (
                  <EntCard
                    key={item.id}
                    ent={item}
                    onClick={() => handleShowDetails(item.id)}
                  />
                ))}
              </div>

            )}

          </div>
          <div className="col-5">
            <ListInterations interactions={filteredInteraction} />
          </div>
        </section>
      )}

      {entID !== 0 && (
        <DetailsEntreprise ent={
          emplois.find((item) => item.id === entID) as IEntreprise
        }
        />
      )}
      <AddEntModal
        onAddElement={() => {
          setEmplois((prev) => [...prev, data]);
        }}
      />
    </>

  );
}

export default EntPage;
