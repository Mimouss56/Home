import {
  FormEvent, useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import axiosInstance from '../../../utils/axios';
import { Job } from '../../../@types/Home/emploi';
import SkillInput from '../../Job/skillInput';
import { ISkill } from '../../../@types/Home/skill';
import { IEntreprise } from '../../../@types/Home/ent';

const initFormData = {
  id: 0,
  name: '',
  adress: '',
  postalCode: '',
  town: '',
  urlImg: '',
  contact: [],
};

function AddEntModal() {
  const [formData, setFormData] = useState<IEntreprise>(initFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ...inputData } = formData;

    try {
      const response = await axiosInstance.post('/api/home/', inputData);
      toast.success(response.data.message);
      delete response.data.message;
      delete response.data.code;
    } catch (err) {
      const error = err as Error;
      toast.warning(error.message);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div
        className="modal fade"
        id="addEntModal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter une entreprise</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="mb-3 input-group">
                <span className="input-group-text" id="nameEnt">Nom</span>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Nom de l'entreprise"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" id="addressEnt">
                  <i className="bi bi-geo-alt" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="adress"
                  name="adress"
                  value={formData.adress}
                  onChange={handleInputChange}
                  placeholder="N°, rue, avenue, etc..."
                />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text" id="postalCode">
                  <i className="bi bi-map" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Code postal"
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" id="town">
                  <i className="bi bi-buildings" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="town"
                  name="town"
                  value={formData.town}
                  onChange={handleInputChange}
                  placeholder="Ville"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="urlImg">
                  <i className="bi bi-globe2" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="urlImg"
                  name="urlImg"
                  placeholder="URL de l'image"
                  value={formData.urlImg}
                  onChange={handleInputChange}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddEntModal;
