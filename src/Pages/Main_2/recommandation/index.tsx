import IRecommandation from '../../../@types/Home/recommandation';
import ModalAddRecomm from '../../../components/Modal/PortFolio/formRecomm';
import useFetchData from '../../../hook/useFetchData';
import SectionLayout from '../../../layout/SectionLayout';
import CardRecomm from './cardRecomm';

const idName = 'recommandation';

function Recommandation() {
  const [dataRecommendation] = useFetchData('/api/home/recommandations');

  return (
    <SectionLayout idName={idName} title="Recommandations" addButton="addRecommandation">
      <div
        className="d-flex flex-column justify-content-evenly justify-items-center w-100 mx-auto "
        id={`${idName}-content`}
        style={{
          height: `${dataRecommendation.length * 75}vh`,
        }}
      >
        {dataRecommendation.map((r: IRecommandation, index: number) => (
          <CardRecomm card={r} index={index} key={r.id} />
        ))}
      </div>
      <ModalAddRecomm onAddElement={dataRecommendation} />
    </SectionLayout>

  );
}

export default Recommandation;
