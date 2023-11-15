import FloatCard from '../../FloatCard';
import { Job as IJob } from '../../../@types/Home/emploi';

interface JobProps {
  jobs: IJob[];
}

function Job({ jobs }: JobProps) {
  return (
    <div className="d-flex flex-wrap container">
      {
        jobs.map((job: IJob) => (
          <FloatCard
            key={job.id}
            ent={job.ent}
            title={job.title}
            desc={job.description}
            url_img={job.urlImg}
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
