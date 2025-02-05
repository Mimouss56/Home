import dayjs from 'dayjs';
import useFormInput from '../../../hook/useFormInput';
import useSanctionStore from '../../../store/sanction.store';
import useChildrenStore from '../../../store/children.store';
import ModalBodySanction from './bodyFormSanction';
import ModalHeaderSanction from './headerModal';


const initFormData = {
  id: 0,
  label: '',
  id_child: 0,
  warn: false,
  read: false,
  created_at: dayjs().format('YYYY-MM-DD'),
  paid: false,
};
function ModalAddSanction() {
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
    addItemModal.addEventListener('show.bs.modal', (event: Event) => {
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
        paid: Boolean(sanction.paid),
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
          <ModalHeaderSanction id={form.id}/>

          <ModalBodySanction handChecked={handChecked} handleChange={handleChange} form={form}/>

        </div>
      </div>
    </form>

  );
}

export default ModalAddSanction;
