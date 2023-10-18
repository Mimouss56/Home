import {
  useEffect, useState,
} from 'react';
import { IcreateStudent } from '../../../@types/ESA/student';

interface FormProps {
  child: IcreateStudent | null;
  onSubmit: (data: IcreateStudent) => Promise<void>;
}

function ModalAddChildren({ child = null, onSubmit }: FormProps) {
  const [currentChild, setCurrentChild] = useState<IcreateStudent>(
    {
      id: 0,
      first_name: '',
      last_name: '',
      classe: '',
    },
  );
  const listClass = ['TPS', 'PS', 'MS', 'GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];

  useEffect(() => {
    if (child) setCurrentChild(child);
  }, [child]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setCurrentChild((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(currentChild);
  };
  return (
    <div className="modal-body">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            placeholder="Prénom de l'enfant"
            value={currentChild.first_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            placeholder="Nom de famille de l'enfant"
            value={currentChild.last_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="classe" className="form-label">Classe</label>
          <select
            className="form-select"
            id="classe"
            name="classe"
            value={currentChild.classe}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez une classe</option>
            {listClass.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className="modal-footer d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button
            type="submit"
            className="btn btn-success"
            data-bs-dismiss="modal"
          >
            {currentChild.id ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalAddChildren;
