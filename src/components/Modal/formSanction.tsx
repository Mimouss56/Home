import {
  useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import { ISanction } from '../../@types/Home/sanction';
import { User as IUser } from '../../@types/Home/user';
import axiosInstance from '../../utils/axios';
import useFormInput from '../../utils/formInput';

interface ModalAddItemProps {
  onAddElement: (data: ISanction) => void;
}
const initFormData = {
  id: 0,
  label: '',
  child:
  {
    id: 0,
  },
  warn: false,
};
function ModalAddSanction({ onAddElement }: ModalAddItemProps) {
  const [childrenList, setChildrenList] = useState<IUser[]>([]);
  // const [formData, setFormData] = useState(initFormData);
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initFormData);

  const fetchData = async (id: number, callback: (data: any) => void) => {
    if (id === 0) {
      callback(initFormData);
      return;
    }
    try {
      const response = await axiosInstance.get(`/api/home/sanction/${id}`);
      const sanctionData = response.data;

      callback({
        id,
        label: sanctionData.label || '',
        child: sanctionData.child || '',
        warn: sanctionData.warn || false,
      });
    } catch (error) {
      toast.error('Erreur lors de la récupération des données de la sanction à éditer');
    }
  };
  const fetchChildren = async () => {
    const response = await axiosInstance.get('/api/home/user');
    const { data } = response;
    const childrenListData = data.filter((oneChild: IUser) => oneChild.child === true);
    setChildrenList(childrenListData);
  };

  useEffect(() => {
    fetchChildren();
    const addItemModal = document.getElementById('ModalAddSanction');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const idModal = button.getAttribute('data-bs-id');

        fetchData(Number(idModal), setForm);
      });
    }
  }, [setForm]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const childId = Number(e.target.value);
    const selectedChild = childrenList.find((child) => child.id === childId);
    if (selectedChild) {
      setForm((prev) => ({ ...prev, child: selectedChild }));
    }
  };

  const handleSwitchSanction = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, warn: event.target.checked }));
  };

  return (
    <form onSubmit={(e) => handleSave(e, '/api/home/sanction', onAddElement)}>
      <div className="modal fade" id="ModalAddSanction">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                {form.id === 0 ? 'Ajouter' : 'Editer'}
                {' '}
                la sanction
              </h2>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-around col ">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="important">Important</span>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input input-group "
                      type="checkbox"
                      role="switch"
                      name="warn"
                      {...(form.id && { id: form.id.toString() })}
                      checked={form.warn || false}
                      onChange={handleSwitchSanction}
                    />
                  </div>
                </div>
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="inputGroupChild">Choix Enfant</label>
                  <select
                    className="form-select"
                    id="inputGroupChild"
                    aria-label="choix de l'enfant"
                    name="childId"
                    onChange={handleSelect}
                    value={form.child.id}
                  >
                    <option>Choose...</option>
                    {childrenList.map((childInfo) => (
                      <option
                        key={childInfo.id}
                        value={childInfo.id}
                        className="text-capitalize"
                      >
                        {childInfo.username}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">Raison</span>
                  <textarea
                    className="form-control"
                    id="content"
                    name="label"
                    placeholder="Raison de la sanction"
                    value={form.label}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-around">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  {form.id !== 0 ? 'Modifier' : 'Ajouter'}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

  );
}

export default ModalAddSanction;
