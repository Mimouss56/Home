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
          />
        ))
      }
    </section>
  );
}

export default Xp;