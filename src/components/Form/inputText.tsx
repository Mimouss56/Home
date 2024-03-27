interface IForm {
  text: string,
  title: string,
  name: string,
  icon: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function InputText({
  title, text = '', onChange, name, icon,
}: IForm) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id={title}>
        <i className={`bi bi-${icon} px-1`} />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder={title}
        aria-label="prez"
        aria-describedby="prez"
        value={text}
        name={name}
        onChange={onChange}
      />

    </div>
  );
}

export default InputText;
