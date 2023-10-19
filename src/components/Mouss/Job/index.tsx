import FloatCard from '../../FloatCard';
import { Job as IJob } from '../../../@types/Home/emploi';

interface JobProps {
  jobs: IJob[];
}

function Job({ jobs }: JobProps) {
  return (
    <div className="d-flex flex-wrap vw-80 m-auto container">
      {
        jobs.map((job: IJob) => (
          <FloatCard
            key={job.id}
            ent={job.ent}
            title={job.title}
            desc={job.description}
            url_img={job.url_img}
            date={job.date}
            competences={job.competences || []}
            id={job.id}
          />
        ))
      }
    </div>

  );
}

export default Job;