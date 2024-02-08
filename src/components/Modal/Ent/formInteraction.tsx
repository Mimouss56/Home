/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ErrorSanctionProps } from '../../../@types/error';
import axiosInstance from '../../../utils/axios';
import { IInteraction } from '../../../@types/Home/ent';
import useFormInput from '../../../utils/formInput';

function ModalAddInteraction({ idContact, onAddElement }: { idContact: number, onAddElement: (data: IInteraction) => void }) {
  const initDataForm = {
    id_contact: idContact,
  };
  const { handleChange, handleSave } = useFormInput(initDataForm);
  const [status, setStatus] = useState([{ id: 0, label: '' }]);

  const fetchDataStatus = async () => {
    try {
      const data = await axiosInstance.get('/api/home/suivi/status');
      setStatus(data.data);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  useEffect(() => {
    fetchDataStatus();
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addInteraction"
      >
        Ajouter une interaction
      </button>
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
                      id="status"
                      className="form-select"
                      onChange={handleChange}
                    >
                      <option value="" disabled>Choisir un status</option>
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
    </>
  );
}

export default ModalAddInteraction;