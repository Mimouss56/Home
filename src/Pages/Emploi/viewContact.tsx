import { useEffect, useState } from 'react';
import { IContact } from '../../@types/Home/ent';
import useFormInput from '../../hook/useFormInput';

function DetailsContact({ contact }: { contact: IContact }) {
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(contact);
  const [showForm, setShowForm] = useState(false);
  const [editRole, setEditRole] = useState(false);

  useEffect(() => {
    setForm(contact);
  }, [setForm, contact]);

  return (
    <div className="mb-2 card rounded-0">
      <h5 className="px-2">

        <div className="input-group mb-1">
          <input
            type="text"
            name="role"
            className={editRole ? 'form-control' : 'form-control-plaintext'}
            onDoubleClick={() => setEditRole(!editRole)}
            value={form.role}
            onChange={handleChange}
            aria-describedby="Rôle"
          />
          {editRole && (
            <button
              type="button"
              className="input-group-text  bg-success "
              onClick={(e: never) => {
                setEditRole(!editRole);
                handleSave(e, '/api/home/suivi/contact', () => { });
              }}
            >
              <i className="bi bi-check" />
            </button>
          )}
        </div>
      </h5>
      <div>
        <div className="input-group mb-1">
          <span className="input-group-text" id="prefixId">
            <a href={`mailto:${form.email}`}>
              <i className="bi bi-envelope" />
            </a>
          </span>
          <input
            type="email"
            className="form-control"
            aria-describedby="prefixId"
            value={form.email}
            onChange={handleChange}
            readOnly={!showForm}
            name="email"
          />
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text" id="prefixId">
            <a href={`tel:+33${form.phone}`}>
              <i className="bi bi-phone" />
            </a>
          </span>
          <input
            type="text"
            className="form-control"
            aria-describedby="prefixId"
            value={form.phone}
            onChange={handleChange}
            readOnly={!showForm}
            name="phone"
          />
        </div>
        <button
          type="button"
          className={`btn ${!showForm ? 'btn-secondary' : 'btn-success'} text-end`}
          onClick={(e: never) => {
            setShowForm(!showForm);
            if (showForm) {
              handleSave(e, '/api/home/suivi/contact', () => { });
            }
          }}
        >
          <i className={`bi ${!showForm ? 'bi-pencil' : 'bi-check'}`} />
          <span className="mx-2">{!showForm ? 'Editer' : 'Enregistrer'}</span>
        </button>
      </div>
    </div>
  );
}

export default DetailsContact;
