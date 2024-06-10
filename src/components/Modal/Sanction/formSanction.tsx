import {
  useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import { ISanction } from '../../../@types/Home/sanction';
import { IUser } from '../../../@types/Home/user';
import axiosInstance from '../../../utils/axios';
import useFormInput from '../../../hook/useFormInput';
import Textarea from '../../Form/textarea';

interface ModalAddItemProps {
  onAddElement: (data: ISanction) => void;
}
const initFormData = {
  id: 0,
  label: '',
  id_child: 0,
  warn: false,
  read: false,
};
function ModalAddSanction({ onAddElement }: ModalAddItemProps) {
  const [childrenList, setChildrenList] = useState<IUser[]>([]);
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initFormData);

  const addItemModal = document.getElementById('ModalAddSanction');

  const fetchData = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/api/home/sanction/${id}`);
      const sanctionData = response.data;

      setForm({
        id: sanctionData.id,
        label: sanctionData.label,
        id_child: sanctionData.child.id,
        warn: sanctionData.warn,
        read: sanctionData.read,
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

  if (addItemModal) {
    addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
      const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
      const button = relatedTarget as HTMLButtonElement;
      const idModal = button.getAttribute('data-bs-id');
      if (Number(idModal) !== 0) fetchData(Number(idModal));
      else setForm(initFormData);
    });
  }

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleSwitchSanction = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, warn: event.target.checked }));
  };

  return (
    <form
      onSubmit={(e) => handleSave(e, '/api/home/sanction', onAddElement)}
      className="modal fade"
      id="ModalAddSanction"
    >
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
                  name="id_child"
                  onChange={handleChange}
                  value={form.id_child}
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
            <Textarea
              title="Raison"
              text={form.label}
              onChange={handleChange}
              name="label"
              leng={500}
              icon={null}
            />
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
    </form>

  );
}

export default ModalAddSanction;
