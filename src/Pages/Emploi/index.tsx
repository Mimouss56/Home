import { useContext, useEffect, useState } from 'react';
import { IEntreprise } from '../../@types/Home/ent';
import AddEntModal from '../../components/Modal/Ent/formEntSuivi';
import EntCard from '../../components/FloatCard/entCard';
import Interations from './Interactions';
import SectionLayout from '../../layout/SectionLayout';
import { entContext } from '../../store/ent.context';

function EntPage() {
  const { ent } = useContext(entContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmplois, setFilteredEmplois] = useState<IEntreprise[]>(ent);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = ent.filter(
      (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredEmplois(filtered);
  };
  useEffect(() => {
    setFilteredEmplois(ent);
  }, [ent]);

  return (
    <SectionLayout idName="ent" title="Suivi Candidature" addButton={null}>

      <section className="d-flex flex-lg-row min-vh-100 pt-5 flex-sm-column flex-wrap justify-content-center ">
        <div className="col-lg-7 col-sm-12 mx-sm-auto h-100">
          <div className="input-group w-75 m-auto mb-2">
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
            {filteredEmplois.length === 0 && (
              <button
                type="button"
                className="btn btn-primary z-3"
                data-bs-toggle="modal"
                data-bs-target="#addEntModal"
                data-bs-id={0}
                data-bs-name-search={searchTerm}
              >
                Ajouter
              </button>
            )}
          </div>
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
        <div className="col-lg-5 ">
          <Interations listEnt={filteredEmplois} />
        </div>
      </section>
      {/* Modal Add Ent */}
      <AddEntModal />
    </SectionLayout>
  );
}

export default EntPage;
