import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IContact } from '../../../@types/Home/ent';
import axiosInstance from '../../../utils/axios';
import { ErrorSanctionProps } from '../../../@types/error';

function DetailsInteraction({ idContact }: { idContact: number }) {
  const [contact, setContact] = useState<IContact>();

  const fetchData = async (id: number) => {
    try {
      const data = await axiosInstance.get(`/api/home/suivi/contact/${id}`);
      setContact(data.data);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  useEffect(() => {
    fetchData(idContact);
  }, [idContact]);

  return (
    <div>
      <div>
        <p>{contact?.email}</p>
        <p>{contact?.phone}</p>
        <p>{contact?.role}</p>

      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Moyen</th>
            <th>Réponse</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {contact?.interaction
            .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
            .map((inter) => (
              <tr key={inter.id}>
                <td>{inter.moyen}</td>
                <td>{inter.reponse}</td>
                <td>{inter.status}</td>
                <td>{inter.created_at}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

  );
}

export default DetailsInteraction;
