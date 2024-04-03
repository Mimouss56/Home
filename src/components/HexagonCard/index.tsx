import ICardPortfolio from '../../@types/portfolio';
import FlipCard from './flipCard';
import useFetchData from '../../hook/useFetchData';
import './style.scss';
import DetailsFloatCard from '../FloatCard/modalViewDetailsFloatCard';
import ModalAddFolio from '../Modal/PortFolio/formPortfolio';
import useScrollSection from '../../hook/useScrollSection';
import SectionLayout from '../../layout/SectionLayout';

const width = 200;
const marginHexa = 2;
const idName = 'portfolio';

function HexaSection() {
  const [dataPortfolio] = useFetchData('/api/home/portfolio');
  useScrollSection(idName);

  return (
    <>
      <SectionLayout idName={idName} title="Mes différentes réalisations" addButton="addPortfolio">
        <div className="w-75 m-auto d-flex justify-content-center flex-wrap max-vh-100 my-5">
          <div className="hex-container my-5">
            {dataPortfolio && dataPortfolio
              .sort((a: ICardPortfolio, b: ICardPortfolio) => (a.id < b.id ? -1 : 1))
              .map((item: ICardPortfolio) => (
                <div
                  key={item.id}
                  data-bs-toggle="modal"
                  data-bs-target="#viewDetailsFloatCard"
                  data-bs-id={item.id}
                  data-bs-type="portfolio"
                  className="d-inline-block "
                  style={{
                    width: `${width}px`,
                    height: `${width * 1.1547}px`,
                    margin: `${marginHexa}px`,
                    marginBottom: `${marginHexa - width * 0.2885}px`,

                  }}
                >
                  <FlipCard
                    img={item.urlImg}
                    title={item.nameSite}
                    widthHexa={width}
                  />
                </div>
              ))}
          </div>
        </div>
      </SectionLayout>
      <DetailsFloatCard />
      <ModalAddFolio onAddElement={dataPortfolio} />

    </>

  );
}

export default HexaSection;
