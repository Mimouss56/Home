import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { IEntreprise } from '../../../@types/Home/ent';
import useFormInput from '../../../hook/useFormInput';
import { entContext } from '../../../store/ent.context';

const initFormData = {
  address: '',
  postalCode: '',
  town: '',
  urlImg: '',
  id: 0,
} as IEntreprise;

function AddEntModal() {
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initFormData);
  const { ent } = useContext(entContext);

  const onAddElement = (data: AxiosResponse) => {
    const { data: returnValue } = data;
    const newEnt = returnValue as IEntreprise;

    const index = ent.findIndex((e) => e.id === newEnt.id);
    if (index === -1) {
      ent.push(newEnt);
    } else {
      ent[index] = newEnt;
    }
  };

  useEffect(() => {
    const addItemModal = document.getElementById('addEntModal');
    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const nameAdd = button.getAttribute('data-bs-name-search');
        if (nameAdd) setForm({ ...initFormData, name: nameAdd });
        const idEnt = button.getAttribute('data-bs-id-ent');

        if (idEnt) {
          const entDetails = ent.find((e) => e.id === Number(idEnt));
          if (entDetails) setForm(entDetails);
        }
      });
    }
    // on remove le addEventListener
    return () => {
      if (addItemModal) {
        addItemModal.removeEventListener('show.bs.modal', () => { });
      }
    };
  }, [setForm, ent]);

  return (
    <form onSubmit={(e) => handleSave(e, '/api/home/ent', onAddElement)}>
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
                  id="address"
                  name="address"
                  value={form.address}
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
  );
}

export default AddEntModal;
