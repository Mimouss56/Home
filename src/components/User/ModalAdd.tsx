import {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { Job } from '../../@types/Home/emploi';
import SkillInput from './skillInput';
import { ISkill } from '../../@types/Home/skill';

interface ModalAddItemProps {
  onAddElement: (data: Job, type: string) => void;
}

function ModalAddItem({ onAddElement }: ModalAddItemProps) {
  const [formData, setFormData] = useState({
    type: 'job',
    ent: '',
    title: '',
    ville: '',
    departement: '',
    debut: '',
    fin: '',
    description: '',
    urlImg: '',
  });
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { type, ...inputData } = formData;

    try {
      const response = await axiosInstance.post(`/home/${type}/@me`, inputData);
      toast.success(response.data.message);
      delete response.data.message;
      delete response.data.code;
      onAddElement(response.data, type);
    } catch (err) {
      const error = err as Error;
      toast.warning(error.message);
    }
  };
  const handleSkillSelected = (skill: ISkill) => {
    setSelectedSkills((prevSkills) => [...prevSkills, skill]);
  };
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.addEventListener('show.bs.modal', (e) => {
        const event = e as MouseEvent;
        const relatedTarget = event.relatedTarget as HTMLElement;
        const selectValue = relatedTarget.getAttribute('data-bs-select');
        setFormData((prev) => ({ ...prev, type: selectValue || 'job' }));
      });
    }
  }, []);

  return (
    <form onSubmit={handleSave}>
      <div
        className="modal fade"
        id="addItem"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">Ajouter un </span>
                <select
                  className="form-select input-group-select"
                  aria-label="Default select example"
                  defaultValue={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="job">Emploi</option>
                  <option value="school">Formation</option>
                </select>

              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-buildings px-1" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Entreprise/Ecole"
                    aria-label="Entreprise"
                    aria-describedby="basic-addon1"
                    name="ent"
                    value={formData.ent}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-briefcase px-1" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Intitulé"
                    aria-label="Intitulé"
                    aria-describedby="basic-addon1"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-calendar px-1" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ville"
                    aria-label="Ville"
                    aria-describedby="basic-addon1"
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-calendar px-1" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Departement"
                    aria-label="Departement"
                    aria-describedby="basic-addon1"
                    name="departement"
                    value={formData.departement}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-calendar px-1" />
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Date de début"
                    aria-label="Date de début"
                    aria-describedby="basic-addon1"
                    name="debut"
                    value={formData.debut}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-calendar px-1" />
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Date de fin"
                    aria-label="Date de fin"
                    aria-describedby="basic-addon1"
                    name="fin"
                    value={formData.fin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-file-earmark-text px-1" />
                </span>
                <textarea
                  className="form-control"
                  placeholder="Description"
                  aria-label="Description"
                  aria-describedby="basic-addon1"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group mb-3">
                <SkillInput onSkillSelected={handleSkillSelected} />
                {selectedSkills.map((skill) => (
                  <span key={skill.id}>
                    {skill.name}
                  </span>
                ))}
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  https://
                </span>
                <input
                  className="form-control"
                  placeholder="Url de l'image"
                  aria-label="Url de l'image"
                  aria-describedby="basic-addon1"
                  name="urlImg"
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

export default ModalAddItem;
