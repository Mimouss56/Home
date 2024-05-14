/* eslint-disable max-len */
import { useEffect } from 'react';
import { IInteraction, IStatus } from '../../../@types/Home/ent';
import useFormInput from '../../../hook/useFormInput';
import Textarea from '../../Form/textarea';
import useFetchData from '../../../hook/useFetchData';

function ModalAddInteraction({ onAddElement }: { onAddElement: (data: IInteraction) => void }) {
  const initDataForm = {
    id_contact: 0,
    moyen: '',
    reponse: '',
    idStatus: 0,
    id: 0,
    createdAt: '',
  };
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initDataForm);
  const [dataStatus] = useFetchData('/api/home/suivi/status');
  const status = dataStatus as IStatus[];

  useEffect(() => {
    const addItemModal = document.getElementById('addInteraction');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const idContact = button.getAttribute('data-bs-id-contact');
        setForm({ ...form, id_contact: Number(idContact) });
      });
    }

    return () => {
      if (addItemModal) {
        addItemModal.removeEventListener('show.bs.modal', () => { });
      }
    };
  }, [setForm, form]);

  return (
    <form
      onSubmit={(e) => handleSave(
        e,
        '/api/home/suivi/interaction',
        onAddElement,
      )}
      className="modal fade"
      id="addInteraction"
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
              <div className="input-group mb-3">
                <span className="input-group-text">Moyen</span>
                <input
                  type="text"
                  name="moyen"
                  id="moyen"
                  className="form-control"
                  placeholder="Par quel moyen ?"
                  onChange={handleChange}
                />
              </div>

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

    </form>
  );
}

export default ModalAddInteraction;
