import ICardPortfolio from '../../../@types/portfolio';
import DetailsFloatCard from '../../../components/FloatCard/modalViewDetailsFloatCard';
import FlipCard from '../../../components/HexagonCard/flipCard';
import ModalAddFolio from '../../../components/Modal/PortFolio/formPortfolio';
import useFetchData from '../../../hook/useFetchData';
import SectionLayout from '../../../layout/SectionLayout';
import './style.scss';

const width = 200;
const marginHexa = 2;
const float = 1.732 * width + 4 * marginHexa - 1;
// creation d'un style root
const root = document.documentElement;
root.style.setProperty('--float', `${float}px`);

// calc(1.732 * #{ $width } + 4 * #{ $margin } - 1px);

const idName = 'portfolio';

function HexaSection() {
  const [dataPortfolio] = useFetchData('/api/home/portfolio');

  return (
    <SectionLayout
      idName={idName}
      title="Mes différentes réalisations"
      addButton="addPortfolio"
    >
      <div
        className="w-75 m-auto d-flex justify-content-center flex-wrap max-vh-100 my-5 d-none d-md-block "
        id={`${idName}-content`}
      >
        <div className="my-5">
          <div
            id="beforeFloat"
            style={{
              content: 'test',
              width: width / 2 + marginHexa,
              float: 'left',
              height: '120%',
              backgroundColor: 'yellow',
            }}
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
                className="d-inline-block "
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
      <DetailsFloatCard />
      <ModalAddFolio onAddElement={dataPortfolio} />
    </SectionLayout>

  );
}

export default HexaSection;
