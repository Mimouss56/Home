import { useEffect, useRef } from 'react';
import { IContact } from '../../../../@types/Home/ent';
import useFormInput from '../../../../hook/useFormInput';
import InputText from '../../../Form/inputText';
import ButtonEndModal from '../../../Form/ButtonFooterModal';

const initFormData: IContact = {
  nom: '',
  prenom: '',
  email: '',
  phone: '',
  role: '',
  idEnt: 0,
  id: 0,
  // interaction: [],
};

const handleRetrieveModal = async (
  event: Event,
  setForm: (arg0: IContact) => void,
  form: IContact,
) => {
  const { relatedTarget } = event as unknown as { relatedTarget: EventTarget };
  const button = relatedTarget as HTMLButtonElement;
  try {
    setForm({ ...form, idEnt: Number(button.dataset.bsIdEnt) });
  } catch (error) {
    setForm({ ...initFormData });
  }
};
const retrieveIDModal = (
  setForm: ((arg0: IContact) => void),
  addItemRef: HTMLDivElement | null,
  form: IContact,
) => {
  if (addItemRef) {
    addItemRef.addEventListener('show.bs.modal', (event) => handleRetrieveModal(event, setForm, form));
  }
  // on remove le addEventListener
  return () => {
    if (addItemRef) {
      addItemRef.removeEventListener('show.bs.modal', () => { });
    }
  };
};

interface AddEntModalProps {
  onAddElement: (data: IContact) => void
}

export default function AddContactModal({ onAddElement }: AddEntModalProps) {
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initFormData);
  const addItemRef = useRef(null);

  useEffect(
    () => retrieveIDModal(setForm, addItemRef.current, form),
    [setForm, form],
  );

  return (
    <form
      onSubmit={(e) => handleSave(e, '/api/home/suivi/contact', onAddElement)}
      className="modal fade"
      id="addContact"
      ref={addItemRef}
    >

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ajouter un contact</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <InputText
                title="Nom"
                text={form.nom}
                name="nom"
                icon="person"
                onChange={handleChange}
              />
              <InputText
                title="Prénom"
                text={form.prenom}
                name="prenom"
                icon="person"
                onChange={handleChange}
              />
              <InputText
                title="Email"
                text={form.email}
                name="email"
                icon="envelope-at"
                onChange={handleChange}
                type="email"
              />
              <InputText
                title="Téléphone"
                text={form.phone}
                name="phone"
                icon="telephone"
                onChange={handleChange}
                type="tel"
              />
              <InputText
                title="Role"
                text={form.role}
                name="role"
                icon="person-workspace"
                onChange={handleChange}
              />
              <ButtonEndModal />
            </div>
          </div>
        </div>
      </div>

    </form>

  );
}
