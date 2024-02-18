import FloatCard from '../FloatCard';
import { Job as IJob } from '../../@types/Home/emploi';

interface JobProps {
  jobs: IJob[];
  typeData: string;
}

function Job({ jobs, typeData }: JobProps) {
  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {
        jobs.map((job: IJob) => (
          <FloatCard
            key={job.id}
            id={job.id}
            title={job.title}
            desc={job.description}
            urlImg={job.ent.url_img}
            alt={job.ent.name}
            date={job.date}
            competences={job.competences || []}
            target="addItem"
            type={typeData}
          />
        ))
      }
    </div>

  );
}

export default Job;
