import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import axiosInstance from '../../utils/axios';
import { ISanction, ISanctionResult } from '../../@types/sanction';
import AddSanction from './modalSanction';

dayjs.extend(isoWeek);
function Sanction() {
  const [sanctions, setSanctions] = useState<ISanction[]>([]);
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/sanction');
      setSanctions(response.data);
    } catch (error) {
      sessionStorage.setItem('notifToast', 'Erreur lors du chargement des sanctions.');
    }
  };

  const handleSubmitDelete = (id: number) => {
    axiosInstance.delete(`/sanction/${id}`).then((res) => {
      if (res.data.error) {
        sessionStorage.setItem('notifToast', res.data.error);
      } else {
        sessionStorage.setItem('notifToast', 'Sanction supprimée');

        setSanctions(sanctions.filter((sanction: ISanction) => sanction.id !== id));
      }
    });
  };

  const handleAddSanction = (sanction: ISanctionResult) => {
    setSanctions((oldSanctions) => [...oldSanctions, sanction.sanction]);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <article className="vw-100 table-responsive">
      <div className="d-flex justify-content-between">
        <h1>Sanction</h1>

        {user.role.id === 1 && (
          <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#ModalAddSanction">
            Ajout d&apos;une sanction
          </button>
        )}
      </div>
      <AddSanction onAddSanction={handleAddSanction} />

      <table className="table table-striped table-sm text-center">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Semaine</th>
            <th scope="col" className="d-none d-sm-table-cell">Date</th>
            <th scope="col">Auteur</th>
            {user.role.id === 1 && (
              <th scope="col">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sanctions.map((sanction) => (

            <tr key={sanction.id}>
              <td>
                {

                  (user.role.id !== 1 && (dayjs().isoWeek() === sanction.date.week)) ? '************' : sanction.label
                }

              </td>
              <td>{`S${sanction.date.week}/${sanction.date.year}`}</td>
              <td className="d-none d-sm-table-cell">
                {sanction.date.complete}
              </td>
              <td>{sanction.author.username}</td>
              {
                user.role.id === 1 && (
                  <td>
                    <button type="button" className="btn btn-danger" onClick={() => handleSubmitDelete(sanction.id)}>
                      x
                    </button>
                  </td>
                )
              }
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default Sanction;
