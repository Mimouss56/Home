import DetailsXp from './detailsXp';

interface IEmploi {
  ent: string
  title: string
  date: {
    debut: string,
    fin: string
  },
  lieu: {
    ville: string,
    departement: string
  },
  description: string,
  competences: string[]
}

function Xp(contents: { content: IEmploi[], titre: string, filter: string }) {
  const {
    content,
    filter,
    titre,
  } = contents;

  // filtre par compétences = informatique
  const contentFiltred = content.filter((emploi: IEmploi) => emploi.competences.includes(filter));
  return (
    <section id="xp" className="px-3">
      <h2 id="title" className="py-1">{titre}</h2>
      {
        contentFiltred.map((emploi: IEmploi) => (
          <DetailsXp
            key={emploi.ent}
            ent={emploi.ent}
            date={emploi.date}
            lieu={emploi.lieu}
            description={emploi.description}
            title={emploi.title}
          />
        ))
      }
    </section>
  );
}

export default Xp;
