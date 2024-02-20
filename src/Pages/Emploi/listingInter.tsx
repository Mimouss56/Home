import dayjs from 'dayjs';
import { IInterVue } from '../../@types/Home/ent';

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
          className="table table-primary"
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
                // si created_at est > 15 jours, on l'affiche sinon on passe
                if (dayjs().diff(dayjs(inter.createdAt), 'day') < 7) {
                  return null;
                }
                return (
                  (
                    <tr key={inter.id}>
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
