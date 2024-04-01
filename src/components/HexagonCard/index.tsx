import ICardPortfolio from '../../@types/portfolio';
import FlipCard from './flipCard';
import useFetchData from '../../hook/useFetchData';
import './style.scss';
import DetailsFloatCard from '../FloatCard/modalViewDetailsFloatCard';
import ModalAddFolio from '../Modal/PortFolio/formPortfolio';
import { IUser } from '../../@types/Home/user';

const width = 200;
const marginHexa = 2;

function HexaSection() {
  const [dataPortfolio] = useFetchData('/api/home/portfolio');
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as IUser;
  const isMouss = (userSession?.username === 'Mouss');
  return (
    <section
      className="d-flex justify-content-center flex-column h-75 bg-dark"
    >
      <div className="d-flex justify-content-between mb-5 w-100 mx-auto border-1 border-top border-bottom p-2 bg-secondary">
        <h2>Mes différentes réalisations</h2>
        {isMouss && (
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addPortfolio"
          >
            Ajout d&apos;un item
          </button>
        )}
      </div>

      <div className="w-50 mx-auto d-flex justify-content-center flex-wrap vh-auto">
        <div className="hex-container vh-100">
          {dataPortfolio && dataPortfolio
            .sort((a: ICardPortfolio, b: ICardPortfolio) => (a.id < b.id ? -1 : 1))
            .map((item: ICardPortfolio, index: number) => (
              <div
                key={item.id}
                data-bs-toggle="modal"
                data-bs-target="#viewDetailsFloatCard"
                data-bs-id={item.id}
                data-bs-type="portfolio"
                className="d-inline-block "
                style={{
                  animation: `flipOn ${(dataPortfolio.length - index) * 0.2}s ease-in-out`,
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
      <DetailsFloatCard />
      <ModalAddFolio onAddElement={dataPortfolio} />

    </section>
  );
}

export default HexaSection;
