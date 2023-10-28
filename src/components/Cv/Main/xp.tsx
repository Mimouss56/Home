import { IEmploi } from '../../../@types/Home/emploi';
import DetailsXp from './detailsXp';

function Xp(contents: { content: IEmploi[], titre: string }) {
  const {
    content,
    titre,
  } = contents;

  return (
    <section id="xp" className="p-3">
      <h2 id="title_info" className="py-1">{titre}</h2>
      {
        content.map((emploi: IEmploi) => (
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
