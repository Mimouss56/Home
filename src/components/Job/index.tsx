import FloatCard from '../FloatCard';
import { Job as IJob } from '../../@types/Home/emploi';

interface JobProps {
  jobs: IJob[];
}

function Job({ jobs }: JobProps) {
  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {
        jobs.map((job: IJob) => (
          <FloatCard
            key={job.id}
            id={job.id}
            title={job.title}
            desc={job.description}
            urlImg={job.urlImg}
            alt={job.ent}
            date={job.date}
            competences={job.competences || []}
            target="addItem"
          />
        ))
      }
    </div>

  );
}

export default Job;
