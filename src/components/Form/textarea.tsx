interface IForm {
  text: string,
  title: string,
  leng: number,
  name: string,
  icon: string | null,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function Textarea({
  title, text = '', leng, onChange, name, icon,
}: IForm) {
  return (
    <>
      <div className="input-group mb-1">
        <span className="input-group-text" id={title}>
          {icon && <i className={`bi bi-${icon} px-1`} />}
          {!icon && title}
        </span>
        <textarea
          // type="text"
          className="form-control"
          placeholder={text}
          aria-label="prez"
          aria-describedby="prez"
          value={text}
          name={name}
          onChange={onChange}
          rows={4}
          maxLength={leng}
        />
        {/* {!editName && (
    <button
      type="button"
      className="input-group-text text-bg-warning"
      onClick={() => setEditName(!editName)}
    >
      <i className="bi bi-pencil" />
    </button>
  )} */}
      </div>
      <i
        className={`form-text badge ${text.length > leng ? 'text-bg-danger ' : 'text-bg-info '} mb-3`}
      >
        {`${text.length} / ${leng}`}
      </i>

    </>
  );
}
export default Textarea;
