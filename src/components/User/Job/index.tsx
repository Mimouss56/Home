import FloatCard from '../../FloatCard';
import { Job as IJob } from '../../../@types/job';

interface JobProps {
  jobs: IJob[];
}

function Job({ jobs }: JobProps) {
  return (
    <div className="d-flex flex-wrap vw-80 m-auto container">
      {
        jobs.map((job: IJob) => (
          <FloatCard
            key={job.title}
            title={job.ent}
            desc={job.description}
            url_img={job.url_img}
            date={job.date}
            competences={job.competences}
          />
        ))
      }
    </div>

  );
}

export default Job;
