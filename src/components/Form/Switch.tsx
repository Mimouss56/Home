interface SwitchButtonProps {
  name: string;
  active: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  title?: string;
}

export default function SwitchButton({
  name, active, onChange, id, title,
}: SwitchButtonProps) {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        name={name}
        defaultChecked={active}
        id={id}
        onChange={onChange}
      // value={active.toString()}
      // checked={!!active}
      />
      {title && (
        <label className="form-check-label" htmlFor={id}>
          {title}
        </label>
      )}
    </div>

  );
}

SwitchButton.defaultProps = {
  id: '',
  title: '',
};
