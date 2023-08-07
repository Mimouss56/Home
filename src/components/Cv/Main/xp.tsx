import DetailsXp from './detailsXp';

<<<<<<< HEAD
=======
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

>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
function Xp(contents: { content: IEmploi[], titre: string, filter: string }) {
  const {
    content,
    filter,
    titre,
  } = contents;

  // filtre par compétences = informatique
<<<<<<< HEAD
  const contentFiltred = (filter.length !== 0)
    ? content.filter((emploi: IEmploi) => emploi.competences.includes(filter)) : content;
  return (
    <section id="xp" className="p-3">
=======
  const contentFiltred = content.filter((emploi: IEmploi) => emploi.competences.includes(filter));
  return (
    <section id="xp" className="px-3">
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
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
