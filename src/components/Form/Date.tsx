import { DateInputProps } from '../../@types/Home/formElement';

function DateInput({
  placeholder, name, value, onChange,
}: DateInputProps) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        <i className="bi bi-calendar px-1" />
      </span>
      <input
        type="date"
        className="form-control"
        placeholder={placeholder}
        aria-label={placeholder}
        aria-describedby="basic-addon1"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default DateInput;
