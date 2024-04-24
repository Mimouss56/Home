import { useEffect, useState } from 'react';
import { IEntreprise } from '../../@types/Home/ent';
import AddEntModal from '../../components/Modal/Ent/formEntSuivi';
import EntCard from '../../components/FloatCard/entCard';
import Interations from './Interactions';
import useFetchData from '../../hook/useFetchData';
import SectionLayout from '../../layout/SectionLayout';

function EntPage() {
  const [emplois, setEmplois] = useState<IEntreprise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmplois, setFilteredEmplois] = useState<IEntreprise[]>([]);

  const [data] = useFetchData('/api/home/ent');
  const listEnt = data as IEntreprise[];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = emplois.filter(
      (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredEmplois(filtered);
  };

  const fetchEnt = (allEnt: IEntreprise[]) => {
    setEmplois(allEnt);
    setFilteredEmplois(allEnt);
  };

  useEffect(() => {
    fetchEnt(listEnt);
  }, [listEnt]);

  return (
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
      <section className="d-flex flex-row min-vh-100">
        <div className="col-7">
          {filteredEmplois && (
            <div className="d-flex flex-wrap justify-content-evenly ">
              {filteredEmplois.map((item) => (
                <a
                  href={`/user/emploi/ent/${item.id}/details`}
                  key={item.id}
                  className="text-decoration-none"
                >
                  <EntCard
                    ent={item}
                  />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="col-5">
          <Interations listEnt={filteredEmplois} />
        </div>
      </section>
      {/* Modal Add Ent */}
      <AddEntModal
        onAddElement={() => {
          setEmplois((prev) => [...prev, data]);
        }}
      />
    </SectionLayout>
  );
}

export default EntPage;
