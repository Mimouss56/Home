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
// const float = 1.732 * width + 4 * marginHexa - 1;

const idName = 'portfolio';

function HexaSection() {
  const [dataPortfolio] = useFetchData('/api/home/portfolio');
  useScrollSection(idName);

  return (
    <>
      <SectionLayout idName={idName} title="Mes différentes réalisations" addButton="addPortfolio">
        <div className="w-75 m-auto d-flex justify-content-center flex-wrap max-vh-100 my-5">
          <div className="my-5">
            <div
              id="beforeFloat"
              style={{
                content: '""',
                width: width / 2 + marginHexa,
                float: 'left',
                height: width * 1.1547 + marginHexa * 2,
                backgroundColor: 'yellow',
                // shapeOutside: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
              className="d-none d-sm-inline-block"
            />
            {dataPortfolio && dataPortfolio
              .sort((a: ICardPortfolio, b: ICardPortfolio) => (a.id < b.id ? -1 : 1))
              .map((item: ICardPortfolio) => (
                <div
                  key={item.id}
                  data-bs-toggle="modal"
                  data-bs-target="#viewDetailsFloatCard"
                  data-bs-id={item.id}
                  data-bs-type="portfolio"
                  className="d-inline-block"
                  style={{
                    width,
                    height: width * 1.1547,
                    margin: marginHexa,
                    // `${}, ${marginHexa}, ${marginHexa - width * 0.2885}, ${marginHexa}`,
                    marginBottom: marginHexa - width * 0.2885,

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
