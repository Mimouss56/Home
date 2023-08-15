import { copyFileSync } from 'fs';
import { toast } from 'react-toastify';
import {
  FormEvent, useEffect, useState,
} from 'react';
import axiosInstance from '../../utils/axios';
import { ISanctionResult } from '../../@types/sanction';
import { User as IUser } from '../../@types/user';

interface ModalAddSanctionProps {
  onAddSanction: (sanction: ISanctionResult) => void;
}

function ModalAddSanction({ onAddSanction }: ModalAddSanctionProps) {
  const [content, setContent] = useState('');
  const [warn, setWarn] = useState(false);
  const [child, setChild] = useState(0);
  const [childrenList, setChildrenList] = useState<IUser[]>([]);
  const [sanctionID, setSanctionID] = useState(0);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    const modal = document.getElementById('ModalAddSanction');

    const handleModalShow = (e: Event) => {
      const target = e as any;
      const modalSanctionID = Number(target.relatedTarget.getAttribute('data-bs-id'));
      setSanctionID(modalSanctionID);
    };

    modal?.addEventListener('show.bs.modal', handleModalShow);

    return () => {
      modal?.removeEventListener('show.bs.modal', handleModalShow);
      setChild(0);
      setContent('');
      setWarn(false);
      setSanctionID(0);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/sanction/${sanctionID}`);
      const { data } = response;
      console.log(data.warn);

      setContent(data.label);
      setChild(data.child.id);
      setWarn(data.warn);
    };

    if (sanctionID) fetchData();
  }, [sanctionID]);

  useEffect(() => {
    const fetchChildren = async () => {
      const response = await axiosInstance.get('/user');
      const { data } = response;
      const childrenListData = data.filter((oneChild: IUser) => oneChild.child === true);
      setChildrenList(childrenListData);
    };

    fetchChildren();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user') || '{}') as IUser;
    const newData = {
      label: content,
      author_id: user.id,
      id_child: child,
      warn,
    };

    try {
      let response;
      if (sanctionID !== 0) {
        response = await axiosInstance.put(`/sanction/${sanctionID}`, newData);
      } else {
        response = await axiosInstance.post('/sanction', newData);
      }

      toast.success(response.data.message);
      setContent('');
      setChild(0);
      setWarn(false);
      setSanctionID(0);
      onAddSanction(response.data);
    } catch (err: any) {
      toast.warning(err.message);
    }
  };

  return (
    <form
      method="post"
      id={sanctionID.toString()}
      onSubmit={(e) => handleSubmit(e)}
    >
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
                  aria-label="choix de l'enfant"
                  value={child}
                  onChange={(e) => setChild(Number(e.target.value))}
                >
                  <option disabled value={0}>Choisir un enfant</option>
                  {childrenList.map((childInfo) => (

                    <option
                      key={childInfo.id}
                      value={Number(childInfo.id)}
                      className="text-capitalize"
                    >
                      {childInfo.username}
                    </option>
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
                  checked={warn}
                  onChange={() => setWarn(!warn)}
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
              {
                sanctionID !== 0
                  ? (
                    <button
                      type="submit"
                      className="btn btn-warning"
                      data-bs-dismiss="modal"
                      value={sanctionID}
                    >
                      Modifier
                    </button>
                  )
                  : (
                    <button
                      type="submit"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                    >
                      Ajouter
                    </button>
                  )
              }

            </div>
          </div>
        </div>
      </div>

    </form>

  );
}

export default ModalAddSanction;
