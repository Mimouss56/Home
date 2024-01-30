import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { excerpt } from '../../utils/main';
import { ISanction } from '../../@types/Home/sanction';
import ModalAddSanction from '../../components/Modal/formSanction';
import ModalViewDetails from '../../components/Modal/viewSanction';

dayjs.extend(isoWeek);

function Sanction() {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const [sanctionList, setSanctionList] = useState<ISanction[]>([]);

  const fetchData = async (idRole: number) => {
    try {
      const { data } = await axiosInstance.get('/api/home/sanction');
      const updatedData = data.map((sanction: ISanction) => {
        if (idRole !== 1 && sanction.date.week >= dayjs().isoWeek()) {
          return { ...sanction, label: '**********' };
        }
        return sanction;
      });

      setSanctionList(updatedData);
    } catch (error) {
      toast.error(`Error fetching sanction: ${error}`);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await axiosInstance.delete(`/api/home/sanction/${id}`);
      setSanctionList((prev) => prev.filter((sanction) => sanction.id !== id));
      toast.success(result.data.message);
    } catch (error) {
      toast.error(`Error deleting sanction: ${error}`);
    }
  };
  const handleAddElement = () => {
    fetchData(user.role.id);
  };

  useEffect(() => {
    fetchData(user.role.id);
  }, [user.role.id]);

  return (
    <>
      <ModalViewDetails />
      <ModalAddSanction onAddElement={handleAddElement} />
      <article>
        <div className="d-flex justify-content-between">
          <h1>Liste des Sanctions</h1>
          {user.role.id === 1 && (
            <button
              type="button"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#ModalAddSanction"
              data-bs-id="0"
            >
              Ajout d&apos;une sanction
            </button>
          )}
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm text-center">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Week</th>
                <th scope="col">Auteur</th>
                {user.role.id === 1 && (
                  <>
                    <th scope="col">Enfant</th>
                    <th scope="col">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sanctionList.map((sanction) => (
                <tr
                  key={sanction.id}
                  className={sanction.warn ? 'table-danger' : ''}
                  data-bs-toggle="modal"
                  data-bs-target="#modalViewSanction"
                  data-bs-id={sanction.id}
                >
                  <td>{excerpt(sanction.label)}</td>
                  <td>{`S${sanction.date.week}/${sanction.date.year}`}</td>
                  <td>{sanction.author.username}</td>
                  {user.role.id === 1 && (
                    <>
                      <td className="text-capitalize">{sanction.child.username.toLowerCase()}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning mx-1"
                          data-bs-toggle="modal"
                          data-bs-target="#ModalAddSanction"
                          data-bs-id={sanction.id}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mx-1"
                          onClick={() => handleDelete(sanction.id)}
                        >
                          <i className="bi bi-trash3" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

export default Sanction;
