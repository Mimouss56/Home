import useFetchData from '../../../hook/useFetchData';
import useScrollSection from '../../../hook/useScrollSection';
import SectionLayout from '../../../layout/SectionLayout';
import CarouselTest from './carousel';

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
        <CarouselTest skills={dataHardSkill} />
      </div>
    </SectionLayout>
  );
}

export default SkillSection;
