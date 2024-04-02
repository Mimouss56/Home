import { IHard } from '../../../@types/Home/hardSkill';
import Tags from '../../../components/Tag';
import useFetchData from '../../../hook/useFetchData';

function SkillSection() {
  const [dataHardSkill] = useFetchData('/api/home/hardskill');
  return (
    <section
      className="d-flex justify-content-center flex-column h-75 bg-dark pb-5"
    >
      <div className="d-flex justify-content-between mb-5 w-100 mx-auto border-1 border-top border-bottom p-2 bg-secondary">
        <h2>Mes compétences</h2>
      </div>

      <div className="w-75 mx-auto d-flex justify-content-center flex-wrap vh-auto">
        {dataHardSkill && dataHardSkill.map((skill: IHard) => (
          <Tags
            key={skill.id}
            icon={skill.urlIcon}
            name={skill.label}
            color={skill.color}
          />
        ))}

      </div>
    </section>

  );
}

export default SkillSection;
