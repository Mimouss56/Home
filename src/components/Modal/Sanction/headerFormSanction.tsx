import useChildrenStore from "../../../store/children.store";
import Select from "../../Form/Select";
import SwitchButton from "../../Form/Switch";

interface PropsheaderSanction {
  warn: boolean;
  id_child: number;
  handChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function HeaderSanction({warn, id_child, handChecked, handleChange}: PropsheaderSanction) {
  const { child: childrenList } = useChildrenStore((state) => state);

  return (
    <div className="d-flex justify-content-around col ">
    <SwitchButton
      name="warn"
      checked={warn}
      onChange={handChecked}
      title="Important"
    />
    <Select
      title='Choix Enfant'
      list={childrenList.map((child) => ({ id: child.id, label: child.username }))}
      name='id_child'
      handleChange={handleChange}
      value={id_child}
      placeholder='Choisir un enfant'

    />
  </div>

  )
}

export default HeaderSanction;