import { useEffect } from 'react';
import { IContact } from '../../../@types/Home/ent';
import useFormInput from '../../../hook/useFormInput';

interface AddEntModalProps {
  onAddElement: (data: IContact) => void
}

function AddContactModal({ onAddElement }: AddEntModalProps) {
  const initFormData = {
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    role: '',
    idEnt: 0,
    id: 0,
  } as IContact;
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initFormData);

  useEffect(() => {
    const addItemModal = document.getElementById('addContact');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const idEnt = button.getAttribute('data-bs-id-ent');
        setForm({ ...form, idEnt: Number(idEnt) });
      });
    }
    // on remove le addEventListener
    return () => {
      if (addItemModal) {
        addItemModal.removeEventListener('show.bs.modal', () => { });
      }
    };
  }, [form, setForm]);

  return (
    <form
      onSubmit={(e) => handleSave(e, '/api/home/suivi/contact', onAddElement)}
      className="modal fade"
      id="addContact"
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

              <div className="input-group mb-3">
                <span className="input-group-text" id="nomId">
                  <i className="bi bi-person" />
                </span>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  className="form-control"
                  placeholder="Nom"
                  value={form.nom}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="prenomId">
                  <i className="bi bi-person" />
                </span>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  className="form-control"
                  placeholder="Prénom"
                  aria-describedby="prenomId"
                  value={form.prenom}
                  onChange={handleChange}
                />

              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="emailId">
                  <i className="bi bi-envelope-at" />
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  aria-describedby="emailId"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="phoneId">
                  <i className="bi bi-telephone" />
                </span>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="form-control"
                  placeholder="Téléphone"
                  aria-describedby="phoneId"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="roleId">
                  <i className="bi bi-person-workspace" />
                </span>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="form-control"
                  placeholder="Rôle"
                  aria-describedby="roleId"
                  value={form.role}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

    </form>

  );
}
export default AddContactModal;
