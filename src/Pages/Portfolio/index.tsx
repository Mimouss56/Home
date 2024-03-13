import { toast } from 'react-toastify';
import ICardPortfolio from '../../@types/portfolio';
import ModalAddFolio from '../../components/Modal/PortFolio/formPortfolio';
import FloatCard from '../../components/FloatCard';
import useFetchData from '../../hook/useFetchData';

function Portfolio() {
  const [data] = useFetchData('/api/home/portfolio');
  const listPortfolio = data as ICardPortfolio[];

  return (
    <div>
      <ModalAddFolio onAddElement={() => toast.info('Portfolio')} />
      <h1>Portfolio</h1>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addPortfolio"
      >
        Ajout d&apos;un item
      </button>
      <section className="d-flex w-100 flex-wrap flex-row justify-content-evenly ">
        {listPortfolio && listPortfolio.map((item) => (
          <div key={item.id}>
            {item.urlSite ? (
              <a href={item.urlSite} target="_blank" rel="noopener noreferrer">
                <FloatCard
                  id={item.id}
                  desc={item.description}
                  urlImg={item.urlImg}
                  alt={item.nameSite}
                  urlSite={item.urlSite}
                  target="addPortfolio"
                  type="a"
                  title={item.nameSite}
                  competences={[]}
                />
              </a>
            ) : (
              <FloatCard
                urlImg={item.urlImg}
                desc={item.description}
                alt={item.nameSite}
                id={item.id}
                urlSite={item.urlSite}
                target="addPortfolio"
                type="div"
                title={item.nameSite}
                competences={[]}
              />
            )}
          </div>
        ))}

      </section>
    </div>
  );
}

export default Portfolio;
