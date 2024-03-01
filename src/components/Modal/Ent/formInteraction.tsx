/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IInteraction } from '../../../@types/Home/ent';
import useFormInput from '../../../hook/useFormInput';
import axiosInstance from '../../../utils/axios';
import { ErrorSanctionProps } from '../../../@types/error';

function ModalAddInteraction({ onAddElement }: { onAddElement: (data: IInteraction) => void }) {
  const initDataForm = {
    id_contact: 0,
    moyen: '',
    reponse: '',
    status: 0 || '',
    id: 0,
    createdAt: '',
  };
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initDataForm);
  const [status, setStatus] = useState([{ id: 0, label: '' }]);
  const addItemModal = document.getElementById('addInteraction');

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/home/suivi/status');
      const { data } = response;
      setStatus(data);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  if (addItemModal) {
    addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
      const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
      const button = relatedTarget as HTMLButtonElement;
      const idContact = button.getAttribute('data-bs-id-contact');
      setForm({ ...form, id_contact: Number(idContact) });
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form onSubmit={(e) => handleSave(e, '/api/home/suivi/interaction', onAddElement)}>

      {/* // <!-- Modal --> */}
      <div className="modal fade" id="addInteraction">
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
                <div className="input-group mb-3">
                  <span className="input-group-text">Réponse</span>
                  <textarea
                    name="reponse"
                    id="reponse"
                    className="form-control"
                    placeholder="Le retour de l'interaction"
                    onChange={handleChange}
                  />
                </div>

                {/* //Input Status */}
                <div className="input-group mb-3">
                  <label htmlFor="status" className="input-group-text">Status</label>
                  <select
                    name="status"
                    className="form-select"
                    onChange={handleChange}
                    value={form.status}
                  >
                    <option value={0} disabled>Choisir un status</option>
                    {status.map((stat) => (
                      <option key={stat.id} value={stat.id}>{stat.label}</option>
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
      </div>

    </form>
  );
}

export default ModalAddInteraction;
