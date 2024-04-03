import { toast } from 'react-toastify';
import ICardPortfolio from '../../@types/portfolio';
import ModalAddFolio from '../../components/Modal/PortFolio/formPortfolio';
import FloatCard from '../../components/FloatCard';
import useFetchData from '../../hook/useFetchData';
import Navbar from '../../layout/Navbar';
import navTop from '../../../data/navTop.json';
import SectionLayout from '../../layout/SectionLayout';

function Portfolio() {
  const [data] = useFetchData('/api/home/portfolio');
  const listPortfolio = data as ICardPortfolio[];
  const idName = 'portfolio';
  return (
    <>
      <Navbar navContent={navTop} />
      <ModalAddFolio onAddElement={() => toast.info('Portfolio')} />
      <SectionLayout idName={idName} title="Mes différentes réalisations" addButton="addPortfolio">
        <div className="d-flex justify-content-center flex-wrap max-vh-100 my-5">
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
    </>
  );
}

export default Portfolio;
