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
  const url = user.role.id === 1 ? '/sanction' : '/sanction/@me';

  const fetchData = async (urlSanction: string) => {
    try {
      const response = await axiosInstance.get(urlSanction);
      // sort data by date desc
      response.data.sort(
        (a: ISanction, b: ISanction) => (a.date.complete < b.date.complete ? 1 : -1),
      );

      setSanctions(response.data);
    } catch (error: any) {
      sessionStorage.setItem('notifToast', error.response.data.message);
      if (error.response.status === 401) {
        sessionStorage.clear();
        // redirect to home
        window.location.href = '/';
      }
    }
  };

  const handleAddSanction = (sanction: ISanctionResult) => {
    // si la sanction existe on l'a met a jour sinon on l'ajoute
    const index = sanctions.findIndex((s) => s.id === sanction.sanction.id);
    if (index !== -1) {
      sanctions[index] = sanction.sanction;
      setSanctions([...sanctions]);
      return;
    }

    setSanctions((oldSanctions) => [...oldSanctions, sanction.sanction]);
  };

  const handleSubmitDelete = (id: number) => {
    axiosInstance.delete(`/sanction/${id}`).then((res) => {
      if (res.data.error) {
        sessionStorage.setItem('notifToast', res.data.error);
      } else {
        sessionStorage.setItem('notifToast', 'Sanction supprimée');

        setSanctions(
          sanctions.filter((sanction: ISanction) => sanction.id !== id),
        );
      }
    });
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

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
              <>
                <th scope="col">Enfant</th>
                <th scope="col">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {sanctions.map((sanction) => (

            <tr key={sanction.id}>
              <td>
                {(user.role.id !== 1 && (dayjs().isoWeek() === sanction.date.week)) ? '************' : sanction.label}

              </td>
              <td>{`S${sanction.date.week}/${sanction.date.year}`}</td>
              <td className="d-none d-sm-table-cell">{sanction.date.complete}</td>
              <td>{sanction.author.username}</td>
              {user.role.id === 1 && (
                <>
                  <td className="text-capitalize">{sanction.child.username.toLowerCase()}</td>
                  <td>
                    <button type="button" className="btn btn-danger mx-1" onClick={() => handleSubmitDelete(sanction.id)}>
                      <i className="bi bi-trash3" />
                    </button>
                    <button type="button" className="btn btn-warning mx-1" data-bs-toggle="modal" data-bs-target="#ModalAddSanction" data-bs-id={sanction.id}>
                      <i className="bi bi-pencil" />
                    </button>
                  </td>
                </>
              )}

            </tr>
          ))}
        </tbody>
      </table>

    </article>

  );
}

export default Sanction;
