import DetailsStudy from './detailsStudy';

interface IStudy {
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
  description: string
}

function Study(contents: { content: IStudy[] }) {
  const { content } = contents;
  return (
    <section id="study" className="px-3 pb-5">
      <h2 id="title" className="py-3">Formations</h2>
      {
        content.map((study: IStudy) => (
          <DetailsStudy
            key={study.title}
            ent={study.ent}
            date={study.date}
            lieu={study.lieu}
            title={study.description}
            description={study.title}
          />
        ))
      }
    </section>
  );
}

export default Study;
