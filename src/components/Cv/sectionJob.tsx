import { IEmploi } from '../../@types/Home/emploi';
import FloatCard from '../FloatCard';

function SectionJob({ title, list }: { title: string, list: IEmploi[] }) {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string);
  return (
    <section className="bg-dark w-100">

      <div className="d-flex justify-content-between mt-5 bg-secondary border-1 border-top border-bottom p-2">
        <h2 className="">{title}</h2>
        {userSession?.role.label === 'admin' && (
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addItem"
          >
            Ajouter
          </button>
        )}

      </div>
      <div className="d-flex flex-wrap justify-content-evenly w-75 mx-auto">

        {list && list.sort(
          (a, b) => new Date(b.date.fin).getTime() - new Date(a.date.fin).getTime(),
        )
          .map((job) => (
            <div
              key={job.id}
            >
              <FloatCard
                id={job.id}
                title={job.title}
                desc={job.description}
                urlImg={job.ent.urlImg}
                alt={job.ent.name}
                date={job.date}
                competences={job.competences || []}
                target="addItem"
                type="job"
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default SectionJob;
