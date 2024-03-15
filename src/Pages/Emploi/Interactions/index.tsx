import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IEntreprise, IInterVue } from '../../../@types/Home/ent';

const objectColor = [
  { color: 'table-danger', date: 15 },
  { color: 'table-warning', date: 7 },
  { color: 'table-success', date: 0 },
];

function Interations({ listEnt }: { listEnt: IEntreprise[] }) {
  const [listInteractions, setListInteractions] = useState<IInterVue[]>([]);

  function getLastInteractions(entreprises: IEntreprise[]): IInterVue[] {
    const lastInteractionsArray: IInterVue[] = [];

    entreprises.forEach((entreprise) => {
      entreprise.contact.forEach((contact) => {
        if (contact.interaction && contact.interaction.length > 0) {
          // Trier les interactions par date de création
          contact.interaction.sort(
            (a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix(),
          );

          // Sélectionner la dernière interaction
          const lastInteraction = contact.interaction[0];

          // Vérifier si cette interaction est la plus récente pour cette entreprise
          const existingInteractionIndex = lastInteractionsArray.findIndex(
            (item) => item.entreprise === entreprise.name,
          );
          if (existingInteractionIndex === -1) {
            // Si cette entreprise n'a pas encore d'interaction dans le tableau, l'ajouter
            lastInteractionsArray.push({
              ...lastInteraction,
              entreprise: entreprise.name,
              contact: `${contact.prenom} ${contact.nom}`,
            });
          } else {
            // Si cette entreprise a déjà une interaction dans le tableau, comparer les dates
            const existingInteraction = lastInteractionsArray[existingInteractionIndex];
            if (dayjs(lastInteraction.createdAt).isAfter(existingInteraction.createdAt)) {
              lastInteractionsArray[existingInteractionIndex] = {
                ...lastInteraction,
                entreprise: entreprise.name,
                contact: `${contact.prenom} ${contact.nom}`,
              };
            }
          }
        }
      });
    });

    return lastInteractionsArray;
  }

  useEffect(() => {
    const lastInteractions = getLastInteractions(listEnt);

    setListInteractions(lastInteractions);
  }, [listEnt]);

  return (
    <>
      <div>
        <h1>Listing des interations</h1>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Entreprise</th>
              <th scope="col">Contact</th>
              <th scope="col">Status</th>
              <th scope="col">Jours</th>
            </tr>
          </thead>
          <tbody>
            {listInteractions.map((inter) => {
              const diff = dayjs().diff(dayjs(inter.createdAt), 'days');
              const bgColor = objectColor.find((obj) => diff >= obj.date) || { color: 'table-info' };

              // Afficher uniquement les interactions de plus de 7 jours
              if (diff < 7) {
                return null;
              }

              return (
                <tr key={inter.id} className={bgColor.color}>
                  <td>{inter.entreprise}</td>
                  <td>{inter.contact}</td>
                  <td>{inter.status}</td>
                  <td>{diff}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Interations;
