import dayjs from 'dayjs';
import { IInteraction } from '../../../../@types/Home/ent';

function DetailsInteraction({ interactions }: { interactions: IInteraction[] }) {
  const objectColor = [
    { color: 'table-danger', date: 2 },
    { color: 'table-warning', date: 1 },
    { color: 'table-success', date: 0 },
  ];

  if (!interactions) {
    return <div>Aucune interation actuellementt</div>;
  }

  return (
    <div>
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
          {interactions
            .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
            .map((inter) => {
              // changement de color en fonction du délai de la creation de l'interaction
              const diff = dayjs().diff(inter.created_at, 'month');
              const bgColor = objectColor.find((obj) => diff >= obj.date) || { color: 'table-info' };
              return (
                <tr
                  key={inter.id}
                  className={bgColor.color}
                >
                  <td>{inter.moyen}</td>
                  <td>{inter.reponse}</td>
                  <td>{inter.status}</td>
                  <td>{dayjs(inter.created_at).format('DD/MM/YYYY')}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>

  );
}

export default DetailsInteraction;
