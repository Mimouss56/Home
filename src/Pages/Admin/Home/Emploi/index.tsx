// on liste les emplois /api/home/emploi

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axios';
import { IEntreprise } from '../../../../@types/Home/ent';
import { ErrorSanctionProps } from '../../../../@types/error';
import AddEntModal from '../../../../components/Modal/Ent/formEntSuivi';

function EmploiPage() {
  const [emplois, setEmplois] = useState<IEntreprise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmplois, setFilteredEmplois] = useState<IEntreprise[]>([]);
  const [loader, setLoader] = useState(false);

  const fetchEmploi = async () => {
    setLoader(true);
    try {
      const data = await axiosInstance.get('/api/home/suivi/ent');
      setEmplois(data.data);

      setLoader(false);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
      setLoader(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = emplois.filter(
      (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredEmplois(filtered);
  };

  const handleDelete = async (id: string) => {
    setLoader(true);
    try {
      await axiosInstance.delete(`/api/home/emploi/${id}`);
      setLoader(false);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchEmploi();
  }, []);

  console.log(emplois);

  return (
    <>
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
        {/* on affiche la liste filtrer des entreprise
        {filteredEmplois.length > 0 && (
          <ul className="list-group w-100 text-dark ">
            {filteredEmplois.map((item: IEntreprise) => (
              <li key={item.id} className="list-group-item">
                {item.name}
              </li>
            ))}
          </ul>
        )} */}
        {/* Afficher le bouton "Ajouter" seulement si la recherche ne retourne aucun résultat */}
        {filteredEmplois.length === 0 && (
          <>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addEntModal"
            >
              Ajouter
            </button>
            <AddEntModal onAddElement={fetchEmploi} />
          </>
        )}
      </div>
      <div>

        <div className="d-flex flex-wrap w-75 m-auto ">
          {filteredEmplois && filteredEmplois.map((item: IEntreprise) => (
            <div
              className="card w-25 m-2 bg-light text-dark"
              key={item.id}
            >
              <a
                href={`/user/emploi/ent/${item.id}`}
                className="text-decoration-none text-dark"
              >

                <img
                  className="card-img-top"
                  src={item.urlImg}
                  alt={item.name}
                  style={{ maxWidth: '150px', margin: 'auto', maxHeight: '75px' }}
                />
                <div className="card-body">
                  <h4 className="card-title">{item.name}</h4>
                  <p className="card-text">{`Nombre de contacts: ${item.contact.length}`}</p>
                </div>
              </a>
            </div>

          ))}
        </div>
      </div>
    </>

  );
}

export default EmploiPage;
