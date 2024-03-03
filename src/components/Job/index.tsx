import FloatCard from '../FloatCard';
import { IEmploi } from '../../@types/Home/emploi';

interface JobProps {
  jobs: IEmploi[];
  typeData: string;
}

function Job({ jobs, typeData }: JobProps) {
  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {jobs.sort(
        (a, b) => new Date(b.date.fin).getTime() - new Date(a.date.fin).getTime(),
      )
        .map((job) => (
          <FloatCard
            key={job.id}
            id={job.id}
            title={job.title}
            desc={job.description}
            urlImg={job.ent.urlImg}
            alt={job.ent.name}
            date={job.date}
            competences={job.competences || []}
            target="addItem"
            type={typeData}
          />
        ))}
    </div>

  );
}

export default Job;
