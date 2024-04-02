import { useEffect } from 'react';
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

  useEffect(() => {
    const scrollFunction = () => {
      const sectionElement = document.querySelector('#portfolio') as HTMLElement;
      const sticky = sectionElement.offsetTop;
      const header = document.querySelector('#portfolio-header') as HTMLElement;
      if (window.scrollY > sticky) {
        header.classList.add('fixed-top');
        header.style.top = '60px';
        sectionElement.style.marginTop = '60px';
      } else {
        header.classList.remove('fixed-top');
        header.style.top = '0';
        sectionElement.style.marginTop = '0';
      }
    };

    window.addEventListener('scroll', scrollFunction);
    return () => {
      window.removeEventListener('scroll', () => { });
    };
  }, []);

  return (
    <section
      className="d-flex justify-content-center flex-column h-75 bg-dark"
      id="portfolio"
    >
      <div
        className="d-flex justify-content-between w-100 mx-auto border-1 border-top border-bottom p-2 bg-secondary"
        id="portfolio-header"
      >
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
      <DetailsFloatCard />
      <ModalAddFolio onAddElement={dataPortfolio} />

    </section>
  );
}

export default HexaSection;
