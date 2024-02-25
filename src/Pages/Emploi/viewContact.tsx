import { useEffect, useState } from 'react';
import { IContact } from '../../@types/Home/ent';
import inputForm from '../../utils/formInput';

interface IProps {
  contact: IContact;
}

function DetailsContact({ contact }: IProps) {
  const {
    form, setForm, handleChange, handleSave,
  } = inputForm(contact);
  const [showForm, setShowForm] = useState(false);
  const [editNom, setEditNom] = useState(false);
  const [editPrenom, setEditPrenom] = useState(false);

  useEffect(() => {
    setForm(contact);
  }, [setForm, contact]);

  return (
    <div>
      <h3>
        <div className="d-flex flex-row justify-content-start ">
          <div className="input-group mb-3 w-25">
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
                className="input-group-text  bg-success "
                onClick={(e) => {
                  setEditNom(!editNom);
                  handleSave(e as any, '/api/home/suivi/contact', () => { console.log('done'); });
                }}
              >
                <i className="bi bi-check" />
              </button>
            )}
          </div>

          <div className="input-group mb-3 w-25">
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
                onClick={(e) => {
                  setEditPrenom(!editPrenom);
                  handleSave(e as any, '/api/home/suivi/contact', () => { console.log('done'); });
                }}
              >
                <i className="bi bi-check" />
              </button>
            )}
          </div>
          <i>{contact.role}</i>

        </div>
        {!showForm && (
          <button
            type="button"
            className="btn btn-secondary "
            onClick={() => setShowForm(!showForm)}
          >
            <i className="bi bi-pencil" />
            <span className="mx-2">Editer</span>
          </button>
        )}
        {showForm && (
          <button
            type="button"
            className="btn btn-success"
            onClick={(e) => {
              setShowForm(!showForm);
              handleSave(e as any, '/api/home/suivi/contact', () => { console.log('done'); });
            }}
          >
            <i className="bi bi-check" />
            <span className="mx-2">Enregistrer</span>
          </button>
        )}

      </h3>
      <div>
        <div className="input-group mb-3 w-25">
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
        <div className="input-group mb-3 w-25">
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
      </div>
    </div>
  );
}

export default DetailsContact;
