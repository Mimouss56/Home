import dayjs from 'dayjs';
import { ISanction } from '../../../@types/Home/sanction';
import useFormInput from '../../../hook/useFormInput';
import Textarea from '../../Form/textarea';
import SwitchButton from '../../Form/Switch';
import DateInput from '../../Form/Date';
import useSanctionStore from '../../../store/sanction.store';
import useChildrenStore from '../../../store/children.store';
import Select from '../../Form/Select';

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
  paid: false,
};
function ModalAddSanction({ onAddElement }: ModalAddItemProps) {
  const { sanctions, fetchSanctions } = useSanctionStore((state) => state);
  const { child: childrenList, fetchChildren } = useChildrenStore((state) => state);
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
      );
      if (!sanction) {
        setForm(initFormData);
        return;
      }

      setForm({
        read: false,
        warn: sanction.warn,
        id: sanction.id,
        label: sanction.label,
        created_at: sanction.created_at,
        id_child: sanction.child?.id || 0,
        paid: !!sanction.paid,
      });
    });
  }

  if (childrenList.length === 0) fetchChildren()

  return (
    <form
      onSubmit={(e) => handleSave(e, '/api/home/sanction', fetchSanctions)}
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
                  checked={form.warn}
                  onChange={handChecked}
                  title="Important"
                />
              </div>
              <Select
                title='Choix Enfant'
                list={childrenList.map((child) => ({ id: child.id, label: child.username }))}
                name='id_child'
                handleChange={handleChange}
                value={form.id_child}
                placeholder='Choisir un enfant'

              />
            </div>
            <Textarea
              title="Raison"
              text={form.label}
              onChange={handleChange}
              name="label"
              leng={500}
              icon={null}
            />
            <SwitchButton
              name="paid"
              checked={form.paid}
              onChange={handChecked}
              title="Payé"
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
