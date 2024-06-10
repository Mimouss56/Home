import {
  useContext, useEffect,
  useRef,
} from 'react';
import dayjs from 'dayjs';
import { AxiosPromise } from 'axios';
import axiosInstance from '../../../../utils/axios';
import useFormInput from '../../../../hook/useFormInput';
import { IEmploi, IEmploiPost } from '../../../../@types/Home/emploi';
import { ISoftSkill } from '../../../../@types/Home/softSkill';
import { entContext } from '../../../../store/ent.context';
import Textarea from '../../../Form/textarea';
import InputText from '../../../Form/inputText';
import DateInput from '../../../Form/Date';
import SoftSkillInput from '../../../Job/softSkillComponant';
import ButtonEndModal from '../../../Form/ButtonFooterModal';

const initFormData: IEmploiPost = {
  type: 'job',
  id: 0,
  ent: {
    id: 0,
    name: '',
  },
  title: '',
  date: {
    debut: '',
    fin: '',
  },
  description: '',
  competences: [],
};

const fetchData = (id: number): Promise<AxiosPromise> => axiosInstance.get(`/api/home/cv/${id}`); // 1Action -> 1Promise

const handleRetrieveModal = async (event: Event, setForm: (arg0: IEmploiPost) => void) => {
  const { relatedTarget } = event as unknown as { relatedTarget: EventTarget };
  const button = relatedTarget as HTMLButtonElement;
  try {
    const id = button.getAttribute('data-bs-id');
    if (!id) {
      throw new Error('id is not defined');
    }
    const idCv = parseInt(id, 10);
    const result = await fetchData(idCv);
    const detailsCV = result.data;
    setForm(detailsCV);
  } catch (error) {
    const type = button.getAttribute('data-bs-type') as 'job' | 'school';
    setForm({ ...initFormData, type });
  }
};

const retrieveIDModal = (setForm: ((arg0: IEmploi) => void), addItemRef: HTMLDivElement | null) => {
  if (addItemRef) {
    addItemRef.addEventListener('show.bs.modal', (event) => handleRetrieveModal(event, setForm));
  }
  // on remove le addEventListener
  return () => {
    if (addItemRef) {
      addItemRef.removeEventListener('show.bs.modal', () => { });
    }
  };
};

const handleChangeListSkill = (formState: {
  form: IEmploi; setForm: (arg0: IEmploi) => void;
}, addSkill: ISoftSkill) => {
  const oldArraySkills = formState.form.competences;
  oldArraySkills.push(addSkill);
  formState.setForm({ ...formState.form, competences: oldArraySkills });
};

interface ModalAddItemProps {
  onAddElement: (data: IEmploi) => void;
}

export default function ModalAddItem({ onAddElement }: ModalAddItemProps) {
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initFormData);
  const { ent } = useContext(entContext);
  const addItemRef = useRef(null);

  useEffect(
    () => retrieveIDModal(setForm, addItemRef.current),
    [setForm, addItemRef],
  );

  return (
    <form onSubmit={async (event) => handleSave(event, '/api/home/cv/@me', onAddElement)}>
      <div className="modal fade" id="addItem" ref={addItemRef}>
        <div className="modal-dialog modal-dialog-centered modal-xl ">
          <div className="modal-content">
            <div className="modal-header">

              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">type</span>
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
                    value={form.ent.id}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        ent: {
                          id: parseInt(e.target.value, 10),
                          name: '',
                        },
                      });
                    }}
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

                <DateInput
                  placeholder="Date de début"
                  name="debut"
                  value={dayjs(form.date.debut).format('YYYY-MM-DD')}
                  onChange={(event) => {
                    setForm({
                      ...form,
                      date: {
                        ...form.date,
                        debut: event.target.value,
                      },
                    });
                  }}
                />
                {/* // Date Fin Input */}
                <DateInput
                  placeholder="Date de fin"
                  name="fin"
                  value={dayjs(form.date.fin).format('YYYY-MM-DD')}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      date: {
                        ...form.date,
                        fin: e.target.value,
                      },
                    });
                  }}
                />
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
              <SoftSkillInput
                actualSkills={form.competences}
                onChange={(event) => handleChangeListSkill({ form, setForm }, event)}
              />
              <ButtonEndModal />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
