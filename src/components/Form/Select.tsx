interface SelectProps {
  title?: string;
  list: { id: number, label: string }[];
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: number;
  placeholder: string;
  icon?: string;
  style?: React.CSSProperties;
  className?: string;
}

function Select({
  title,
  list,
  name,
  handleChange,
  value,
  placeholder,
  icon,
  style,
  className

}: SelectProps) {

  return (
    <div className={`input-group mb-3 ${className}`} style={style}>
      {icon && <span className="input-group-text" id="icon-select">
        <i className={`bi bi-${icon} px-1`} />
      </span>
      }
      {title && <label htmlFor={name} className="input-group-text">{title}</label>}
      <select
        name={name}
        className="form-select"
        onChange={handleChange}
        defaultValue={value}
        id={name}
      >
        <option value={0} disabled>{placeholder}</option>
        {list.map((s) => (
          <option key={s.id} value={s.id}>{s.label}</option>
        ))}
      </select>
    </div>

  )
}

export default Select;