import SwitchButton from "../../Form/Switch";
import Textarea from "../../Form/textarea";
import FooterSanction from "./footerFormSanction";
import HeaderSanction from "./headerFormSanction";
import InputText from "../../Form/inputText";

interface PropsModalBodySanction {
  // skipcq: JS-0323
  form: any,
  handChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => void;
}

function ModalBodySanction({form, handChecked, handleChange }: PropsModalBodySanction) {
  return (
    <div className="modal-body">
      <HeaderSanction
        id_child={form.id_child}
        warn={form.warn}
        handChecked={handChecked}
        handleChange={handleChange}
      />
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
      <InputText
        type="date"
        title={form.created_at}
        onChange={handleChange}
        name="created_at"
        placeholder="Date de la sanction"
      />
      <div className="modal-footer d-flex justify-content-around">
        <FooterSanction id={form.id} />
      </div>
    </div>
  )
}

export default ModalBodySanction;