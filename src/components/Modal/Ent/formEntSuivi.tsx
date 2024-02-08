import { IEntreprise } from '../../../@types/Home/ent';
import useFormInput from '../../../utils/formInput';

interface AddEntModalProps {
  onAddElement: (data: IEntreprise[]) => void;
}
const initFormData = {
  name: '',
  adress: '',
  postalCode: '',
  town: '',
  urlImg: '',
};

function AddEntModal({ onAddElement }: AddEntModalProps) {
  const { form, handleChange, handleSave } = useFormInput(initFormData);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addEntModal"
      >
        Ajouter
      </button>
      <form onSubmit={(e) => handleSave(e, '/api/home/suivi/ent', onAddElement)}>
        <div
          className="modal fade"
          id="addEntModal"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter une entreprise</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="mb-3 input-group">
                  <span className="input-group-text" id="nameEnt">Nom</span>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Nom de l'entreprise"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 input-group">
                  <span className="input-group-text" id="addressEnt">
                    <i className="bi bi-geo-alt" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="adress"
                    name="adress"
                    value={form.adress}
                    onChange={handleChange}
                    placeholder="N°, rue, avenue, etc..."
                  />
                </div>

                <div className="mb-3 input-group">
                  <span className="input-group-text" id="postalCode">
                    <i className="bi bi-map" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="Code postal"
                  />
                </div>
                <div className="mb-3 input-group">
                  <span className="input-group-text" id="town">
                    <i className="bi bi-buildings" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="town"
                    name="town"
                    value={form.town}
                    onChange={handleChange}
                    placeholder="Ville"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="urlImg">
                    <i className="bi bi-globe2" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="urlImg"
                    name="urlImg"
                    placeholder="URL de l'image"
                    value={form.urlImg}
                    onChange={handleChange}
                  />
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
    </>
  );
}

export default AddEntModal;
