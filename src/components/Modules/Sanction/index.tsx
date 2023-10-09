import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axios';
import { ICreateSanction, ISanction } from '../../../@types/sanction';
import ModalAdd from './modalAdd';
import ModalView from './modalViewDetails';
import { excerpt } from '../../../utils/main';

dayjs.extend(isoWeek);
interface ValueTargetForm {
  value: string;
  name: string;
}
function Sanction() {
  const [sanctionList, setSanctionList] = useState<ISanction[]>([]);
  const [currentSanction, setCurrentSanction] = useState(null as ICreateSanction | null);

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const url = user.role.id === 1 ? '/sanction' : '/sanction/@me';

  const fetchListSanction = async (urlSanction: string) => {
    const response = await axiosInstance.get(urlSanction);
    // sort data by date desc
    response.data.sort(
      (a: ISanction, b: ISanction) => (a.date.complete < b.date.complete ? 1 : -1),
    );
    setSanctionList(response.data);
    const params = new URLSearchParams(window.location.search);
    const idChild = params.get('child');
    if (idChild) {
      setSanctionList(response.data.filter(
        (sanction: ISanction) => sanction.child.id === Number(idChild),
      ));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { content, childId, warn } = e.target as typeof e.target & {
      content: ValueTargetForm;
      childId: ValueTargetForm;
      warn: { checked: boolean };
    };

    const inputData = {
      warn: warn.checked,
      id_child: Number(childId.value),
      label: content.value,
    };
    if (currentSanction) {
      try {
        const newSanction = { ...currentSanction, ...inputData } as ISanction;
        const result = await axiosInstance.put(`/sanction/${currentSanction.id}`, inputData);
        const index = sanctionList.findIndex((news) => news.id === currentSanction.id);
        sanctionList[index] = newSanction;
        // setSanctionList(sanctionList);
        toast.info(result.data.message);
      } catch (err) {
        const { response } = err as { response: { data: { message: string } } };

        toast.warning(response.data.message);
      }
    } else {
      try {
        const result = await axiosInstance.post('/sanction', inputData);

        setSanctionList((prev) => [...prev, result.data.data]);
        toast.success(result.data.message);
      } catch (err) {
        const { response } = err as { response: { data: { message: string } } };
        toast.warning(response.data.message);
      }
    }
    setCurrentSanction(null);
    fetchListSanction(url);
  };

  const handleEdit = (sanction: ISanction) => {
    setCurrentSanction(sanction);
  };

  const handleDelete = async (id: number) => {
    const result = await axiosInstance.delete(`/sanction/${id}`);
    setSanctionList(sanctionList.filter((sanction) => sanction.id !== id));
    toast.success(result.data.message);
  };

  useEffect(() => {
    fetchListSanction(url);
  }, [url]);

  return (
    <article>
      <div className="d-flex justify-content-between">
        <h1>Liste des Sanctions</h1>

        {user.role.id === 1 && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setCurrentSanction(null)}
            data-bs-toggle="modal"
            data-bs-target="#ModalAddSanction"
          >
            Ajout d&apos;une sanction
          </button>
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm text-center ">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Semaine</th>
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
                className={
                  (sanction.warn === true) ? 'table-danger' : ''
                }
                onClick={() => handleEdit(sanction)}
                data-bs-toggle="modal"
                data-bs-target="#modalViewSanction"
              >
                <td>
                  {(user.role.id !== 1 && (dayjs().isoWeek() === sanction.date.week)) ? '************' : excerpt(sanction.label)}

                </td>
                <td>{`S${sanction.date.week}/${sanction.date.year}`}</td>
                <td>{sanction.author.username}</td>
                {user.role.id === 1 && (
                  <>
                    <td className="text-capitalize">{sanction.child.username.toLowerCase()}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning mx-1"
                        onClick={() => handleEdit(sanction)}
                        data-bs-toggle="modal"
                        data-bs-target="#ModalAddSanction"
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
      {currentSanction && (
        <div
          className="modal fade "
          id="modalViewSanction"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <ModalView sanction={currentSanction as ISanction} />
        </div>
      )}
      {/* Bootstrap Modal */}
      <div className="modal" tabIndex={-1} id="ModalAddSanction">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{currentSanction ? 'Edit News' : 'Add News'}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <ModalAdd sanction={currentSanction} />
            </form>
          </div>
        </div>
      </div>

    </article>

  );
}

export default Sanction;
