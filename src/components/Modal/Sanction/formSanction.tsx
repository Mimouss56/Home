import {
  useContext,
} from 'react';
import dayjs from 'dayjs';
import { ISanction } from '../../../@types/Home/sanction';
import useFormInput from '../../../hook/useFormInput';
import Textarea from '../../Form/textarea';
import SwitchButton from '../../Form/Switch';
import { sanctionsContext } from '../../../store/sanction.context';
import DateInput from '../../Form/Date';

interface ModalAddItemProps {
  onAddElement: (data: ISanction) => void;
}
const initFormData = {
  id: 0,
  label: '',
  id_child: 0,
  warn: false,
  read: false,
  created_at: dayjs().format('YYYY-MM-DD'),
};
function ModalAddSanction({ onAddElement }: ModalAddItemProps) {
  const { sanctions, childrenList } = useContext(sanctionsContext);
  const {
    form,
    setForm,
    handleChange,
    handleSave,
    handChecked,
  } = useFormInput(initFormData);

  const addItemModal = document.getElementById('ModalAddSanction');

  if (addItemModal) {
    addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
      const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
      const button = relatedTarget as HTMLButtonElement;
      const idModal = button.getAttribute('data-bs-id');
      const sanction = sanctions.find(
        (s) => s.id === Number(idModal),
      ) || initFormData;

      setForm({
        read: false,
        warn: sanction.warn,
        id: sanction.id,
        label: sanction.label,
        created_at: sanction.created_at,
        id_child: initFormData.id_child,
      });
    });
  }

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
                <SwitchButton
                  name="warn"
                  active={form.warn}
                  onChange={handChecked}
                  title="Important"
                />
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
            <DateInput
              value={form.created_at}
              onChange={handleChange}
              name="created_at"
              max={dayjs().format('YYYY-MM-DD')}
              placeholder="Date de la sanction"
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
