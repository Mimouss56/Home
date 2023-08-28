import { IEmploi } from '../../../@types/emploi';
import DetailsXp from './detailsXp';

function Xp(contents: { content: IEmploi[], titre: string, filter: string }) {
  const {
    content,
    filter,
    titre,
  } = contents;

  // filtre par compétences = informatique
  const contentFiltred = (filter.length !== 0)
    ? content.filter((emploi: IEmploi) => emploi.competences.includes(filter)) : content;

  console.log(contentFiltred);

  return (
    <section id="xp" className="p-3">
      <h2 id="title_info" className="py-1">{titre}</h2>
      {
        contentFiltred.map((emploi: IEmploi) => (
          <DetailsXp
            key={emploi.ent}
            ent={emploi.ent}
            date={emploi.date}
            lieu={emploi.lieu}
            description={emploi.description}
            title={emploi.title}
            competences={emploi.competences}
          />
        ))
      }
    </section>
  );
}

export default Xp;
