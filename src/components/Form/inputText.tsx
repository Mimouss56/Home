interface IInputText {
  type?: 'text' | 'email' | 'tel' | 'date' | 'password',
  text?: string,
  title: string,
  name: string,
  icon?: string | null,
  placeholder?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function InputText({
  title, text, onChange, name, icon, type, placeholder,
}: IInputText) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id={title}>
        {icon
          ? <i className={`bi bi-${icon} px-1`} />
          : title}
      </span>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder || title}
        aria-label={title}
        aria-describedby={title}
        value={text}
        name={name}
        onChange={onChange}
      />

    </div>
  );
}

export default InputText;

InputText.defaultProps = {
  type: 'text',
  text: '',
  icon: null,
  placeholder: '',
};
