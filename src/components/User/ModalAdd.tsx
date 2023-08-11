import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { Job } from '../../@types/emploi';

function ModalAddItem({ onAddElement }: { onAddElement: (data: Job, type: string) => void }) {
  const [type, setType] = useState('job');
  const [ent, setEnt] = useState('');
  const [title, settitle] = useState('');
  const [ville, setVille] = useState('');
  const [departement, setDepartement] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [description, setDescription] = useState('');
  const [urlImg, setUrlImg] = useState('');

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputData = {
      ent,
      title,
      description,
      debut: dateDebut,
      fin: dateFin,
      ville,
      departement,
      // urlImg,
    };
    axiosInstance.post(`/${type}/@me`, inputData).then((res) => {
      toast.success(
        res.data.message,
      );
      delete res.data.message;
      delete res.data.code;
      onAddElement(res.data, type);
    }).catch((err) => {
      toast.warning(err.message);
    });
  };
  return (
    <form onSubmit={(e) => handleSave(e)}>
      <div
        className="modal fade"
        id="addItem"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter un élément</h5>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setType(e.currentTarget.value)}
                defaultValue={type}
                required
              >
                <option value="job">Emploi</option>
                <option value="school">Formation</option>
              </select>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-buildings px-1" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Entreprise/Ecole"
                    aria-label="Entreprise"
                    aria-describedby="basic-addon1"
                    name="ent"
                    onChange={(e) => setEnt(e.currentTarget.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-briefcase px-1" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Intitulé"
                    aria-label="Intitulé"
                    aria-describedby="basic-addon1"
                    name="title"
                    onChange={(e) => settitle(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-calendar px-1" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ville"
                    aria-label="Ville"
                    aria-describedby="basic-addon1"
                    name="ville"
                    onChange={(e) => setVille(e.currentTarget.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-calendar px-1" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Departement"
                    aria-label="Departement"
                    aria-describedby="basic-addon1"
                    name="departement"
                    onChange={(e) => setDepartement(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-calendar px-1" />
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Date de début"
                    aria-label="Date de début"
                    aria-describedby="basic-addon1"
                    name="debut"
                    onChange={(e) => setDateDebut(e.currentTarget.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-calendar px-1" />
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Date de fin"
                    aria-label="Date de fin"
                    aria-describedby="basic-addon1"
                    name="fin"
                    onChange={(e) => setDateFin(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-file-earmark-text px-1" />
                </span>
                <textarea
                  className="form-control"
                  placeholder="Description"
                  aria-label="Description"
                  aria-describedby="basic-addon1"
                  name="description"
                  onChange={(e) => setDescription(e.currentTarget.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  https://
                </span>
                <input
                  className="form-control"
                  placeholder="Url de l'image"
                  aria-label="Url de l'image"
                  aria-describedby="basic-addon1"
                  name="urlImg"
                  onChange={(e) => setUrlImg(e.currentTarget.value)}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ModalAddItem;
