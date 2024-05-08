import { toast } from 'react-toastify';
import ICardPortfolio from '../../@types/portfolio';
import ModalAddFolio from '../../components/Modal/PortFolio/formPortfolio';
import FloatCard from '../../components/FloatCard';
import useFetchData from '../../hook/useFetchData';
import SectionLayout from '../../layout/SectionLayout';

function Portfolio() {
  const [data] = useFetchData('/api/home/portfolio');
  const listPortfolio = data as ICardPortfolio[];
  const idName = 'portfolio';
  return (
    <>
      <SectionLayout idName={idName} title="Mes différentes réalisations" addButton="addPortfolio">
        <div className="d-flex justify-content-center flex-wrap max-vh-100 my-5 w-75 mx-auto">
          {listPortfolio && listPortfolio.map((item) => (
            <div key={item.id}>
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
            </div>
          ))}
        </div>
      </SectionLayout>
      <ModalAddFolio onAddElement={() => toast.info('Portfolio')} />
    </>
  );
}

export default Portfolio;
