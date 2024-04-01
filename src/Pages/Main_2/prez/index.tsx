import { IHard } from '../../../@types/Home/hardSkill';
import { IUser } from '../../../@types/Home/user';
import Tags from '../../../components/Tag';
import useFetchData from '../../../hook/useFetchData';

function Prez({ Mouss }: { Mouss: IUser }) {
  const [dataHardSkill] = useFetchData('/api/home/hardskill');
  return (
    <section id="landing-page" className="bg-dark min-vh-100 d-flex align-items-center">
      <div className="w-75 h-50 m-auto row">
        <div className="col-md-6">
          <h1>{`${Mouss.last_name} ${Mouss.first_name}`}</h1>
          <p>{`${Mouss.prez}`}</p>
        </div>
        <div className="col-md-6">
          {dataHardSkill && dataHardSkill.map((skill : IHard) => (
            <Tags
              key={skill.id}
              icon={skill.urlIcon}
              name={skill.label}
              color={skill.color}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default Prez;
