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
import Select from '../../../Form/Select';

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
              <Select
                title="type"
                list={[{ id: 1, label: 'Emploi' }, { id: 2, label: 'Formation' }]}
                name="type"
                handleChange={handleChange}
                value={form.type === 'job' ? 1 : 2}
                placeholder="Choisir un type"
              />
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between">

                <Select
                  list={ent.map((e) => ({ id: e.id, label: e.name }))}
                  name="id_ent"
                  handleChange={handleChange}
                  value={form.ent.id}
                  placeholder="Choisir une entreprise"
                  icon='buildings'
                />
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
