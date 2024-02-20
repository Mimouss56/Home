import dayjs from 'dayjs';
import { IInterVue } from '../../@types/Home/ent';

const objectColor = [
  { color: 'table-danger', date: 15 },
  { color: 'table-warning', date: 7 },
  { color: 'table-success', date: 0 },
];
function ListInterations({ interactions }: { interactions: IInterVue[] }) {
  if (interactions.length === 0) {
    return <div>Aucune interation actuellementt</div>;
  }

  return (
    <>
      <div>
        <h1>Listing des interations</h1>
      </div>
      <div
        className="table-responsive"
      >
        <table
          className="table"
        >
          <thead>
            <tr>
              <th scope="col">Entreprise</th>
              <th scope="col">Contact</th>
              <th scope="col">Status</th>
              <th scope="col">Jours</th>
            </tr>
          </thead>
          <tbody>
            {interactions
              .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
              .map((inter) => {
                const diff = dayjs().diff(inter.createdAt, 'days');
                const bgColor = objectColor.find((obj) => diff >= obj.date) || { color: 'table-info' };

                // si created_at est > 7 jours, on l'affiche sinon on passe
                if (diff < 7) {
                  return null;
                }
                return (
                  (
                    <tr
                      key={inter.id}
                      className={bgColor.color}
                    >
                      <td>{inter.entreprise}</td>
                      <td>{inter.contact}</td>
                      <td>{inter.status}</td>
                      <td>{dayjs().diff(dayjs(inter.createdAt), 'day')}</td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListInterations;
