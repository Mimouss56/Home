import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { ISanction } from '../../@types/sanction';
import AddSanction from './modalSanction';

function Sanction() {
  const [sanctions, setSanctions] = useState<ISanction[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/sanction');
      setSanctions(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des sanctions.');
    }
  };

  const handleSubmitDelete = (id: number) => {
    axiosInstance.delete(`/sanction/${id}`).then((res) => {
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success('Sanction supprimée');
        setSanctions(sanctions.filter((sanction: ISanction) => sanction.id !== id));
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (sanctions.length > 0) {
      toast.success('Sanctions chargées');
    }
  }, [sanctions]);
  return (
    <div>
      <h1>Sanction</h1>
      <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#ModalAddSanction">
        Ajout d&apos;une sanction
      </button>
      <AddSanction />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Description</th>
            <th scope="col">Année</th>
            <th scope="col">Semaine</th>
            <th scope="col">Date</th>
            <th scope="col">Auteur</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sanctions.map((sanction) => (
            <tr key={sanction.id}>
              <td>{sanction.id}</td>
              <td>{sanction.label}</td>
              <td>{sanction.date.year}</td>
              <td>{`S${sanction.date.week}`}</td>
              <td>{sanction.date.complete}</td>
              <td>{sanction.author.username}</td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleSubmitDelete(sanction.id)}>
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sanction;
