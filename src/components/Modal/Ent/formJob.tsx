import {
  useCallback, useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import axiosInstance from '../../../utils/axios';
import { Job } from '../../../@types/Home/emploi';
import SkillInput from '../../Job/skillInput';
import { ISkill } from '../../../@types/Home/skill';
import useFormInput from '../../../utils/formInput';

const initFormData = {
  type: 'job',
  ent: '',
  title: '',
  ville: '',
  departement: '',
  debut: '',
  fin: '',
  description: '',
  urlImg: '',
  id: 0,
};
interface ModalAddItemProps {
  onAddElement: (data: Job) => void;
}

function ModalAddItem({ onAddElement }: ModalAddItemProps) {
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initFormData);
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([]);
  // const [IdJob, setIdJob] = useState<number>(0);

  // const handleSave = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const { type, ...inputData } = form;

  //   try {
  //     const response = await axiosInstance.post(`/api/home/${type}/@me`, inputData);
  //     toast.success(response.data.message);
  //     delete response.data.message;
  //     delete response.data.code;
  //     onAddElement(response.data, type);
  //   } catch (err) {
  //     const error = err as Error;
  //     toast.warning(error.message);
  //   }
  // };

  const handleSkillSelected = (skill: ISkill) => {
    setSelectedSkills((prevSkills) => [...prevSkills, skill]);
  };

  const fetchJobData = useCallback(async (id: number, type: string) => {
    if (id === 0) {
      setForm(initFormData);
      return;
    }
    try {
      const response = await axiosInstance.get(`/api/home/${type}/${id}`);
      const jobData = response.data;

      setForm({
        type,
        id,
        ent: jobData.ent || '',
        title: jobData.title || '',
        ville: jobData.lieu.ville || '',
        departement: jobData.lieu.departement || '',
        debut: jobData.date.debut || '',
        fin: jobData.date.fin || '',
        description: jobData.description || '',
        urlImg: jobData.urlImg || '',
      });

      // Assurez-vous de charger les compétences sélectionnées si nécessaire
      setSelectedSkills(jobData.skills || []);
    } catch (error) {
      toast.error('Erreur lors de la récupération des données du job à éditer');
    }
  }, [setForm]);

  useEffect(() => {
    const addItemModal = document.getElementById('addItem');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        // Button that triggered the modal
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        // Extract info from data-bs-* attributes
        const id = button.getAttribute('data-bs-id') as string;
        const type = button.getAttribute('data-bs-type') as string;
        fetchJobData(parseInt(id, 10), type);
      });
    }
  }, [fetchJobData]);
  return (
    <form onSubmit={(e) => handleSave(e, `/api/home/${form.type}/@me`, onAddElement)}>
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
                  aria-label="select Type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
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
                    value={form.ent}
                    onChange={handleChange}
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
                    value={form.title}
                    onChange={handleChange}
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
                    value={form.ville}
                    onChange={handleChange}
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
                    value={form.departement}
                    onChange={handleChange}
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
                    value={dayjs(form.debut).format('YYYY-MM-DD')}
                    onChange={handleChange}
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
                    value={dayjs(form.fin).format('YYYY-MM-DD')}
                    onChange={handleChange}
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
                  value={form.description}
                  onChange={handleChange}
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
                  value={form.urlImg}
                  onChange={handleChange}
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