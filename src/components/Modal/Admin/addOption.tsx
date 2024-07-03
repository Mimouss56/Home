import useFormInput from '../../../hook/useFormInput';
import ButtonEndModal from '../../Form/ButtonFooterModal';
import SwitchButton from '../../Form/Switch';
import InputText from '../../Form/inputText';

const initAddOption = {
  id: 0,
  name: '',
  value: '',
  active: false,
};

interface AddOptionProps {
  onAddElement: (data: IAddOption) => void;
}

interface IAddOption {
  id: number;
  name: string;
  value: string;
  active: boolean;
}

export default function AddFunction({ onAddElement }: AddOptionProps) {
  const {
    handleSave, handleChange, handChecked, form,
  } = useFormInput(initAddOption);
  return (
    <form
      onSubmit={(e) => handleSave(e, '/api/home/option', onAddElement)}
      className="modal"
      id="ModalAddOption"
    >

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add option</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <InputText
              title="Name"
              text={form.name}
              name="name"
              onChange={handleChange}
              placeholder="Nom de la variable"

            />
            <InputText
              title="Value"
              text={form.value}
              name="value"
              onChange={handleChange}
              placeholder="Valeur de la variable"

            />
            <SwitchButton
              name="active"
              active={form.active}
              onChange={handChecked}
              title="Active"
            />
          </div>
          <ButtonEndModal />

        </div>
      </div>
    </form>

  );
}
