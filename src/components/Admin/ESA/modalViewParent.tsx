import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axios';
import { IParent, IStudent } from '../../../@types/ESA/student';

interface FormProps {
  childId: number;
  onParentAdded: () => void;
}

function ModalAddParent({ childId, onParentAdded }: FormProps) {
  const [allParents, setAllParents] = useState<IParent[]>([]);
  const [filteredParents, setFilteredParents] = useState<IParent[]>([]);
  const [parentData, setParentData] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const fetchParents = async () => {
      const response = await axiosInstance.get('/esa/parent');
      setAllParents(response.data);
    };
    fetchParents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const foundParents = allParents.filter(
      (parent) => parent.firstName.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredParents(foundParents);
  };

  const handleParentSelect = async (parent: IParent) => {
    // This function will now just set the selected parent's data to state
    setParentData({
      id: parent.id,
      firstName: parent.firstName,
      lastName: parent.lastName,
      email: parent.email,
    });
    setFilteredParents([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (parentData.id !== 0) {
        const inputValue = {
          child: [childId],
        };
        await axiosInstance.put(
          `/esa/parent/${parentData.id}`,
          inputValue,
        );
      } else {
        const inputValue = {
          firstName: parentData.firstName,
          lastName: parentData.lastName,
          child: [childId],
        };
        await axiosInstance.post('/esa/parent', inputValue);
      }

      toast.success('Parent ajouté avec succès.');
      onParentAdded();
    } catch (err) {
      toast.error("Erreur lors de l'ajout du parent.");
    }
  };

  return (
    <div className="modal-body">
      <div className="autocomplete">
        <div className="input-group mb-3">
          <span className="input-group-text">Prénom</span>
          <input
            type="text"
            className="form-control"
            aria-label="Prénom"
            id="firstName"
            name="firstName"
            placeholder="Prénom du parent"
            value={parentData.firstName}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Nom</span>
          <input
            type="text"
            className="form-control"
            aria-label="Nom"
            id="lastName"
            name="lastName"
            placeholder="Nom de famille du parent"
            value={parentData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Email</span>
          <input
            type="email"
            className="form-control"
            aria-label="Email"
            id="email"
            name="email"
            placeholder="Email du parent"
            value={parentData.email}
            onChange={handleInputChange}
          />
        </div>
        {filteredParents.length > 0 && (
          <div className="list-group">
            {filteredParents.map((parent) => (
              <button
                type="button"
                className="list-group-item list-group-item-action list-group-item-info"
                key={parent.id}
                onClick={() => handleParentSelect(parent)}
                data-id={parent.id.toString()}
              >
                {`${parent.firstName} ${parent.lastName}`}
              </button>
            ))}
          </div>
        )}
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
            onClick={handleSubmit}
            data-bs-dismiss="modal"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddParent;
