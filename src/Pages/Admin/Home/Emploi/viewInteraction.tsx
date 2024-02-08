import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { IContact } from '../../../../@types/Home/ent';
import axiosInstance from '../../../../utils/axios';
import { ErrorSanctionProps } from '../../../../@types/error';
import ModalAddInteraction from '../../../../components/Modal/Ent/formInteraction';

function DetailsInteraction({ idContact }: { idContact: number }) {
  const [contact, setContact] = useState<IContact>();
  const objectColor = [
    { color: 'table-danger', date: 2 },
    { color: 'table-warning', date: 1 },
    { color: 'table-success', date: 0 },
  ];

  const fetchData = async (id: number) => {
    try {
      const data = await axiosInstance.get(`/api/home/suivi/contact/${id}`);
      setContact(data.data);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleAddElement = () => {
    fetchData(idContact);
  };

  useEffect(() => {
    fetchData(idContact);
  }, [idContact]);

  if (!contact) {
    return <div>Aucune info sur ce contact</div>;
  }

  return (
    <div>
      <div>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        <p>{contact.role}</p>

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
          {contact.interaction
            .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
            .map((inter) => {
              // changement de color en fonction du délai de la creation de l'interaction
              const diff = dayjs().diff(inter.createdAt, 'month');
              const bgColor = objectColor.find((obj) => diff >= obj.date) || { color: 'table-info' };
              return (
                <tr
                  key={inter.id}
                  className={bgColor.color}
                >
                  <td>{inter.moyen}</td>
                  <td>{inter.reponse}</td>
                  <td>{inter.status}</td>
                  <td>{dayjs(inter.createdAt).format('DD/MM/YYYY')}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div
        className="mt-3 d-grid gap-2 d-md-flex justify-content-md-end"
      >
        <ModalAddInteraction idContact={idContact} onAddElement={handleAddElement} />

      </div>
    </div>

  );
}

export default DetailsInteraction;
