import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axios';
import { IcreateStudent } from '../../../@types/ESA/student';

interface FormProps {
  childId: IcreateStudent | null;
  onParentAdded: (data: IcreateStudent) => Promise<void>;
}
function ModalAddParent({ childId = null, onParentAdded } : FormProps) {
  const [parentData, setParentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    child: childId ? [childId] : [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Recherche si le parent existe déjà
    try {
      const existingParent = await axiosInstance.get(`/search/parent?email=${parentData.email}`);
      if (existingParent.data) {
        toast.warning('Ce parent existe déjà.');
        return;
      }
    } catch (error) {
      console.error(error);
    }

    try {
      await axiosInstance.post('/parent', parentData);
      toast.success('Parent ajouté avec succès.');
      onParentAdded();
    } catch (err) {
      toast.error("Erreur lors de l'ajout du parent.");
    }
  };

  return (
    <div className="modal-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            placeholder="Prénom du parent"
            value={parentData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            placeholder="Nom de famille du parent"
            value={parentData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email du parent"
            value={parentData.email}
            onChange={handleInputChange}
            required
          />
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
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalAddParent;
