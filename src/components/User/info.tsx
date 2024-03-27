import { IUser } from '../../@types/Home/user';
import useFormInput from '../../hook/useFormInput';
import Textarea from '../Form/textarea';

function Complement() {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}') as IUser;
  const initData = {
    info: true,
    id: user.id,
    prez: user.prez || '',
    phone: user.phone || '',
    address: user.address || '',
    linkedin: user.linkedin || '',
    github: user.github || '',
    website: user.website || '',
  };
  const {
    form, handleChange, handleSave,
  } = useFormInput(initData);
  return (
    <form
      onSubmit={(e) => handleSave(
        e,
        '/api/home/user',
        () => null,
      )}
    >
      <div className="card border-white">
        <div className="card-body">
          <h4 className="card-title text-dark">
            Informations Complémentaires
          </h4>
          <Textarea
            title="Présentation"
            text={form.prez}
            onChange={handleChange}
            name="prez"
            icon={null}
            leng={250}
          />
          {/* // Section GPT */}
          {/* <ChatGPT /> */}
          {/* // Section Phone */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="Phone">
              Téléphone
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={form.phone}
              aria-label="phone"
              aria-describedby="Phone"
              value={form.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>
          {/* // Section Address */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="Address">
              Adresse
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={form.address}
              aria-label="address"
              aria-describedby="Address"
              value={form.address}
              name="address"
              onChange={handleChange}
            />
          </div>

          {/* // Section Linkedin */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="Linkedin">
              <i className="bi bi-linkedin" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={form.linkedin}
              aria-label="linkedin"
              aria-describedby="Linkedin"
              value={form.linkedin}
              name="linkedin"
              onChange={handleChange}
            />
          </div>
          {/* // Section Github */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="Github">
              <i className="bi bi-github" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={form.github}
              aria-label="github"
              aria-describedby="Github"
              value={form.github}
              name="github"
              onChange={handleChange}
            />
          </div>
          {/* // Section Website */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="Website">
              <i className="bi bi-globe2" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={form.website}
              aria-label="website"
              aria-describedby="Website"
              value={form.website}
              name="website"
              onChange={handleChange}
            />
          </div>

        </div>
        <div className="card-footer text-end">
          <button type="submit" className="btn btn-primary">
            Enregistrer
          </button>

        </div>
      </div>
    </form>
  );
}

export default Complement;
