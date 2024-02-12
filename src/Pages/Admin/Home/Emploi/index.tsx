import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axios';
import { IEntreprise } from '../../../../@types/Home/ent';
import { ErrorSanctionProps } from '../../../../@types/error';
import AddEntModal from '../../../../components/Modal/Ent/formEntSuivi';
import EntCard from '../../../../components/FloatCard/entCard';
import DetailsEntreprise from './ent';
import ModalAddItem from '../../../../components/Modal/Ent/formJob';

function EmploiPage() {
  const [emplois, setEmplois] = useState<IEntreprise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmplois, setFilteredEmplois] = useState<IEntreprise[]>([]);
  const [loader, setLoader] = useState(false);
  const [entID, setEntID] = useState(0);
  const [showList, setShowList] = useState(true);

  const fetchEmploi = async () => {
    setLoader(true);
    try {
      const data = await axiosInstance.get('/api/home/suivi/ent');
      setEmplois(data.data);
      setFilteredEmplois(data.data);

      setLoader(false);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
      setLoader(false);
    }
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
  };

  const handleShowDetails = (idEntreprise: number) => {
    setEntID(Number(idEntreprise));
    setShowList(false);
  };

  useEffect(() => {
    fetchEmploi();
  }, []);

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
        {/* Afficher le bouton "Ajouter" seulement si la recherche ne retourne aucun résultat */}
        {filteredEmplois.length === 0 && (<AddEntModal onAddElement={fetchEmploi} />)}
      </div>

      {entID !== 0 && (
        <DetailsEntreprise ent={
          emplois.find((item) => item.id === entID) as IEntreprise
        }
        />
      )}
      {filteredEmplois && showList && (
        <div className="d-flex flex-wrap w-75 m-auto ">
          {filteredEmplois.map((item: IEntreprise) => (
            <EntCard
              key={item.id}
              ent={item}
              onClick={() => handleShowDetails(item.id)}
            />
          ))}
        </div>

      )}
      <ModalAddItem onAddElement={fetchEmploi} />
    </>

  );
}

export default EmploiPage;
