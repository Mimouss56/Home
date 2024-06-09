/* eslint-disable max-len */
import { useEffect, useRef } from 'react';
import { IInteraction, IInteractionPost, IStatus } from '../../../../@types/Home/ent';
import useFormInput from '../../../../hook/useFormInput';
import Textarea from '../../../Form/textarea';
import useFetchData from '../../../../hook/useFetchData';
import ButtonEndModal from '../../../Form/ButtonFooterModal';
import InputText from '../../../Form/inputText';

const initDataForm: IInteractionPost = {
  id_contact: 0,
  moyen: '',
  reponse: '',
  idStatus: 0,
  id: 0,
  createdAt: '',
};
const handleRetrieveModal = async (
  event: Event,
  setForm: (arg0: IInteractionPost) => void,
  form: IInteractionPost,
) => {
  const { relatedTarget } = event as unknown as { relatedTarget: EventTarget };
  const button = relatedTarget as HTMLButtonElement;
  const idContact = button.getAttribute('data-bs-id-contact');
  try {
    setForm({ ...form, id_contact: Number(idContact) });
  } catch (error) {
    setForm({ ...initDataForm });
  }
};

const retrieveIDModal = (
  setForm: ((arg0: IInteractionPost) => void),
  addInter: HTMLDivElement | null,
  form: IInteractionPost,
) => {
  if (addInter) {
    addInter.addEventListener('show.bs.modal', (event) => handleRetrieveModal(event, setForm, form));
  }
  // on remove le addEventListener
  return () => {
    if (addInter) {
      addInter.removeEventListener('show.bs.modal', () => { });
    }
  };
};

export default function ModalAddInteraction({ onAddElement }: { onAddElement: (data: IInteraction) => void }) {
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initDataForm);
  const addInter = useRef(null);
  const [dataStatus] = useFetchData('/api/home/suivi/status');
  const status = dataStatus as IStatus[];

  useEffect(
    () => retrieveIDModal(setForm, addInter.current, form),

    [setForm, form],
  );

  return (
    <form
      onSubmit={(e) => handleSave(
        e,
        '/api/home/suivi/interaction',
        onAddElement,
      )}
      className="modal fade"
      id="addInteraction"
      ref={addInter}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitleId">
              Ajouter une interaction
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="container-fluid">

              {/* //Input Moyen */}
              <InputText
                title="Moyen"
                text={form.moyen}
                onChange={handleChange}
                name="moyen"
                placeholder="Par quel moyen ?"

              />

              {/* //Input Réponse */}
              <Textarea
                title="Réponse"
                text={form.reponse}
                onChange={handleChange}
                name="reponse"
                leng={500}
                icon={null}
              />

              {/* //Input Status */}
              <div className="input-group mb-3">
                <label htmlFor="status" className="input-group-text">Status</label>
                <select
                  name="idStatus"
                  className="form-select"
                  onChange={handleChange}
                  value={form.idStatus}
                >
                  <option value={0} disabled>Choisir un status</option>
                  {status.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <ButtonEndModal />

        </div>
      </div>

    </form>
  );
}
