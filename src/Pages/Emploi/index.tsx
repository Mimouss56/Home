import { useEffect, useState } from 'react';
import { IEntreprise } from '../../@types/Home/ent';
import AddEntModal from '../../components/Modal/Ent/formEntSuivi';
import EntCard from '../../components/FloatCard/entCard';
import DetailsEntreprise from './ent';
import Interations from './Interactions';
import useFetchData from '../../hook/useFetchData';
import Navbar from '../../layout/Navbar';
import navTop from '../../../data/navTop.json';
import SectionLayout from '../../layout/SectionLayout';

function EntPage() {
  const [emplois, setEmplois] = useState<IEntreprise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmplois, setFilteredEmplois] = useState<IEntreprise[]>([]);
  const [entID, setEntID] = useState(0);
  const [showList, setShowList] = useState(true);

  const [data] = useFetchData('/api/home/ent');
  const listEnt = data as IEntreprise[];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntID(0);
    setShowList(true);
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = emplois.filter(
      (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredEmplois(filtered);
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
  }, [listEnt]);

  return (
    <>
      <Navbar navContent={navTop} />
      <SectionLayout idName="ent" title="Suivi Candidature" addButton={null}>
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
              <Interations listEnt={filteredEmplois} />
            </div>
          </section>
        )}

        {entID !== 0 && (
          <DetailsEntreprise ent={
            emplois.find((item) => item.id === entID) as IEntreprise
          }
          />
        )}

      </SectionLayout>

      {/* Liste des entreprises */}
      <AddEntModal
        onAddElement={() => {
          setEmplois((prev) => [...prev, data]);
        }}
      />
    </>

  );
}

export default EntPage;
