import {
  useEffect, useState,
} from 'react';
import { ICreateSanction } from '../../../@types/Home/sanction';
import { User as IUser } from '../../../@types/Home/user';
import axiosInstance from '../../../utils/axios';

interface SanctionFormProps {
  sanction: ICreateSanction | null;
}

function ModalAddSanction({ sanction = null }: SanctionFormProps) {
  const [childrenList, setChildrenList] = useState<IUser[]>([]);
  const [currentSanction, setCurrentSanction] = useState<ICreateSanction>(
    {
      label: '', child: null, warn: false,
    },
  );

  const fetchChildren = async () => {
    const response = await axiosInstance.get('/user');
    const { data } = response;
    const childrenListData = data.filter((oneChild: IUser) => oneChild.child === true);
    setChildrenList(childrenListData);
  };

  useEffect(() => {
    if (sanction) setCurrentSanction(sanction);
    fetchChildren();
  }, [sanction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    setCurrentSanction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const childId = Number(e.target.value);
    const selectedChild = childrenList.find((child) => child.id === childId);
    if (selectedChild) {
      setCurrentSanction((prev) => ({ ...prev, child: selectedChild }));
    }
  };

  const handleSwitchSanction = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSanction((prev) => ({ ...prev, warn: event.target.checked }));
  };

  return (
    <div className="modal-body">
      <div className="d-flex justify-content-around col ">
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            name="warn"
            {...(currentSanction.id && { id: currentSanction.id.toString() })}
            checked={currentSanction.warn || false}
            onChange={handleSwitchSanction}
          />
          Important
        </div>
        <div className="input-group mb-3">
          <select
            className="form-select d-inline-block w-auto ms-2 mb-2"
            aria-label="choix de l'enfant"
            name="childId"
            onChange={handleSelect}
            value={currentSanction.child?.id || 0}
          >
            <option value={0}>Choix Enfant</option>
            {childrenList.map((childInfo) => (
              <option
                key={childInfo.id}
                value={childInfo.id}
                className="text-capitalize"
              >
                {childInfo.username}
              </option>
            ))}
          </select>
        </div>

      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea
          className="form-control"
          id="content"
          name="label"
          placeholder="Raison de la sanction"
          value={currentSanction.label}
          onChange={handleChange}
          rows={5}
          required
        />
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
          {currentSanction.id ? 'Modifier' : 'Ajouter'}
        </button>

      </div>
    </div>

  );
}

export default ModalAddSanction;
