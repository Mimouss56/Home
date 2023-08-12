import { toast } from 'react-toastify';
import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { ISanctionResult } from '../../@types/sanction';
import { User as IUser } from '../../@types/user';

interface ModalAddSanctionProps {
  id: number;
  childs: IUser[];
  onAddSanction: (sanction: ISanctionResult) => void;
}

function ModalAddSanction({ id, childs, onAddSanction }: ModalAddSanctionProps) {
  // si req.params edit=id chargement des données de la sanction
  // sinon création d'une nouvelle sanction
  const [content, setContent] = useState('');
  const [warn, setWarn] = useState(false);
  const [child, setChild] = useState(0);
  const [idSanction, setIdSanction] = useState(id);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const newUser = {
      label: content,
      author_id: user.id,
      id_child: child,
      warn,
    };

    axiosInstance.post('/sanction', newUser).then((res) => {
      toast.success(
        res.data.message,
      );
      setContent('');
      setChild(0);
      setWarn(false);
      onAddSanction(res.data);
    }).catch((err) => {
      toast.warning(err.message);
    });
  };

  useEffect(
    () => {
      console.log('idSanction', idSanction);
    },
    [idSanction],
  );

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="modal fade" id="ModalAddSanction" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Détails de la sanction</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <select
                  className="form-select mb-3 "
                  aria-label="Default select example"
                  defaultValue={child}
                  onChange={(e) => setChild(Number(e.target.value))}
                >
                  <option disabled value={0}>Choisir un enfant</option>
                  {childs.map((childInfo) => (
                    <option key={childInfo.id} value={childInfo.id}>{childInfo.username}</option>
                  ))}
                </select>
              </div>

              <textarea
                name="reason"
                className="form-control mb-3"
                placeholder="Raison de la sanction"
                required
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
              />
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  defaultChecked={warn}
                  onChange={() => {
                    setWarn(!warn);
                  }}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Important</label>
              </div>

            </div>
            <div className="modal-footer d-flex justify-content-around">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="submit"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Ajouter
              </button>

            </div>
          </div>
        </div>
      </div>

    </form>

  );
}

export default ModalAddSanction;
