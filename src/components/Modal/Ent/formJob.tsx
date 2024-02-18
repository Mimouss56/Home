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
import { IEntreprise } from '../../../@types/Home/ent';

const initFormData = {
  type: 'job',
  id_ent: 0,
  title: '',
  debut: '',
  fin: '',
  description: '',
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
  const [listEnt, setListEnt] = useState<IEntreprise[]>([]);

  const fetchListEnt = async () => {
    try {
      const response = await axiosInstance.get('/api/home/suivi/ent');
      setListEnt(response.data);
    } catch (error) {
      toast.error('Erreur lors de la récupération des données des Entreprises');
    }
  };

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
        id_ent: jobData.ent,
        title: jobData.title || '',
        debut: jobData.date.debut || '',
        fin: jobData.date.fin || '',
        description: jobData.description || '',
      });

      // Assurez-vous de charger les compétences sélectionnées si nécessaire
      setSelectedSkills(jobData.skills || []);
    } catch (error) {
      toast.error('Erreur lors de la récupération des données du job à éditer');
    }
  }, [setForm]);

  useEffect(() => {
    fetchListEnt();
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
                  <select
                    className="form-select"
                    aria-label="select Ent"
                    name="id_ent"
                    value={form.id_ent}
                    onChange={handleChange}
                    required
                  >
                    <option value={0} disabled>Choisir une entreprise</option>
                    {listEnt.map((ent) => (
                      <option key={ent.id} value={ent.id}>{ent.name}</option>
                    ))}
                  </select>

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
