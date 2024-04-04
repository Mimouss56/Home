import { IHard } from '../../../@types/Home/hardSkill';
import Tags from '../../../components/Tag';
import useFetchData from '../../../hook/useFetchData';
import useScrollSection from '../../../hook/useScrollSection';
import SectionLayout from '../../../layout/SectionLayout';

const idName = 'skill';

function SkillSection() {
  const [dataHardSkill] = useFetchData('/api/home/hardskill');
  useScrollSection(idName);

  return (
    <SectionLayout
      idName={idName}
      title="Mes compétences"
      addButton={null}
    >
      <div className="w-75 m-auto d-flex justify-content-center flex-wrap my-5">
        {dataHardSkill && dataHardSkill.map((skill: IHard) => (
          <Tags
            key={skill.id}
            icon={skill.urlIcon}
            name={skill.label}
            color={skill.color}
          />
        ))}
      </div>
    </SectionLayout>
  );
}

export default SkillSection;
