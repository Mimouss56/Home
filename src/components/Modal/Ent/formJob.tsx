import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axios';
import useFormInput from '../../../hook/useFormInput';
import SkillInput from '../../Job/softSkillInput';
import { ISoftSkill } from '../../../@types/Home/softSkill';
import { IEmploi } from '../../../@types/Home/emploi';
import Textarea from '../../Form/textarea';
import InputText from '../../Form/inputText';
import { entContext } from '../../../store/ent.context';

const initFormData = {
  type: 'job',
  id: 0,
  id_ent: 0,
  title: '',
  debut: '',
  fin: '',
  description: '',
  competences: [] as number[],
};

interface ModalAddItemProps {
  onAddElement: (data: IEmploi) => void;
  listSkill: ISoftSkill[];
}

function ModalAddItem({ onAddElement, listSkill }: ModalAddItemProps) {
  const [edit, setEdit] = useState(false);
  const [addInput, setAddInput] = useState(false);
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initFormData);
  const { ent } = useContext(entContext);

  const fetchData = (async (id: number) => {
    try {
      const response = await axiosInstance.get(`/api/home/cv/${id}`);
      const emploiData = response.data as IEmploi;
      const returnData = {
        type: emploiData.type,
        id: emploiData.id,
        id_ent: emploiData.ent.id,
        title: emploiData.title,
        debut: emploiData.date.debut,
        fin: emploiData.date.fin,
        description: emploiData.description,
        competences: emploiData.competences.flatMap((c: ISoftSkill) => c.id),
      };
      return returnData;
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
      return initFormData;
    }
  });

  const handleAddSkill = (skill: ISoftSkill) => {
    // on recupere l'ancien liste des form.competences
    const oldArraySkills = form.competences;
    // on ajoute le skill.id à la liste des form.competences
    oldArraySkills.push(skill.id);
    // on met à jour le state
    setForm({ ...form, competences: oldArraySkills });

    setAddInput(false);
  };

  const handleDeleteSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { target } = e;
    const button = target as HTMLButtonElement;
    const idSkill = Number(button.parentElement?.id);
    if (idSkill) {
      // on recupere l'ancien liste des form.competences
      const oldArraySkills = form.competences;
      // on supprime le skill.id à la liste des form.competences
      const newArraySkills = oldArraySkills.filter((skill) => skill !== idSkill);
      // on met à jour le state
      setForm({ ...form, competences: newArraySkills });
    }
  };

  useEffect(() => {
    const addItemModal = document.getElementById('addItem');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const id = button.getAttribute('data-bs-id');
        if (id === null) {
          const type = button.getAttribute('data-bs-type') as 'job' | 'school';
          setForm({ ...initFormData, type });
          return;
        }
        const editForm = button.getAttribute('data-bs-edit');
        if (editForm === null) {
          setEdit(!editForm);
          return;
        }

        const detailsCV = await fetchData(parseInt(id, 10));

        setForm(detailsCV);
      });
    }
    // on remove le addEventListener
    return () => {
      if (addItemModal) {
        addItemModal.removeEventListener('show.bs.modal', () => { });
      }
    };
  }, [setForm, form]);

  return (
    <form onSubmit={async (e) => handleSave(
      e,
      '/api/home/cv/@me',
      onAddElement,
    )}
    >
      <div className="modal fade" id="addItem">
        <div className="modal-dialog modal-dialog-centered modal-xl ">
          <div className="modal-content">
            <div className="modal-header">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  {edit ? 'Editer un' : 'Ajouter un'}
                </span>
                <select
                  className="form-select input-group-select"
                  aria-label="select Type"
                  value={form.type}
                  name="type"
                  onChange={handleChange}
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
                    {ent?.map((e) => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                  </select>
                  {/* // Intitulé Input */}
                </div>
                <InputText
                  title="Intitulé"
                  text={form.title}
                  name="title"
                  icon="briefcase"
                  onChange={handleChange}
                />

              </div>
              {/* // Date Input */}
              <div className="d-flex justify-content-between">
                {/* // Date Debut Input */}
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
                {/* // Date Fin Input */}
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
              {/* // Description Input */}
              <Textarea
                title="Description"
                text={form.description}
                name="description"
                icon="file-earmark-text"
                onChange={handleChange}
                leng={500}
              />
              {/* // Skill Input */}
              <div className="input-group mb-3">
                {/* // List des ID des Skills */}
                {form.competences.map((skillID) => (
                  <span
                    key={skillID}
                    className="badge d-flex align-items-center p-1 pe-2 border rounded-pill text-light-emphasis bg-light-subtle border-light-subtle"
                  >
                    {listSkill.find((skill) => skill.id === skillID)?.name}
                    <span className="vr mx-2" />
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={handleDeleteSkill}
                      id={skillID.toString()}
                    >
                      <i className="bi bi-x" />
                    </button>
                  </span>
                ))}
                {/* // Add Skill Button */}
                {!addInput && (
                  <button
                    className="btn rounded-pill bg-success-subtle"
                    type="button"
                    onClick={() => setAddInput(!addInput)}
                  >
                    <i className="bi bi-plus-circle" />
                  </button>
                )}

                {/* // Input Skill */}
                {addInput && (
                  <SkillInput
                    onSkillSelected={handleAddSkill}
                    skills={form.competences}
                    listSkills={listSkill}
                  />
                )}

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
