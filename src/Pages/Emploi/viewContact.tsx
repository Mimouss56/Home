import { useEffect, useState } from 'react';
import { IContact } from '../../@types/Home/ent';
import useFormInput from '../../hook/useFormInput';

interface IProps {
  contact: IContact;
}

function DetailsContact({ contact }: IProps) {
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(contact);
  const [showForm, setShowForm] = useState(false);
  const [editNom, setEditNom] = useState(false);
  const [editPrenom, setEditPrenom] = useState(false);
  const [editRole, setEditRole] = useState(false);

  useEffect(() => {
    setForm(contact);
  }, [setForm, contact]);

  return (
    <div className="mb-2 card ">
      <h5 className="px-2">
        <div className="d-flex flex-wrap justify-content-between ">
          <div className="input-group mb-1 w-50">
            <input
              type="text"
              name="nom"
              className={editNom ? 'form-control' : 'form-control-plaintext'}
              onDoubleClick={() => setEditNom(!editNom)}
              value={form.nom}
              onChange={handleChange}
              aria-describedby="Nom"
            />
            {editNom && (
              <button
                type="button"
                className="input-group-text bg-success "
                onClick={(e: never) => {
                  setEditNom(!editNom);
                  handleSave(e, '/api/home/suivi/contact', () => { });
                }}
              >
                <i className="bi bi-check" />
              </button>
            )}
          </div>
          <div className="input-group mb-1 w-50">
            <input
              type="text"
              name="prenom"
              className={editPrenom ? 'form-control' : 'form-control-plaintext'}
              onDoubleClick={() => setEditPrenom(!editPrenom)}
              value={form.prenom}
              onChange={handleChange}
              aria-describedby="Nom"
            />
            {editPrenom && (
              <button
                type="button"
                className="input-group-text  bg-success "
                onClick={(e: never) => {
                  setEditPrenom(!editPrenom);
                  handleSave(e, '/api/home/suivi/contact', () => { });
                }}
              >
                <i className="bi bi-check" />
              </button>
            )}
          </div>
        </div>

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
        {!showForm && (
          <button
            type="button"
            className="btn btn-secondary text-end"
            onClick={() => setShowForm(!showForm)}
          >
            <i className="bi bi-pencil" />
            <span className="mx-2">Editer</span>
          </button>
        )}
        {showForm && (
          <button
            type="button"
            className="btn btn-success text-end"
            onClick={(e : never) => {
              setShowForm(!showForm);
              handleSave(e, '/api/home/suivi/contact', () => { });
            }}
          >
            <i className="bi bi-check" />
            <span className="mx-2">Enregistrer</span>
          </button>
        )}

      </div>
    </div>
  );
}

export default DetailsContact;
