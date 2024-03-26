import useFetchData from '../../hook/useFetchData';
import { MoussID } from '../../../config.json';
import Navbar from '../../layout/Navbar';
import Prez from './prez';
import HexaSection from '../../components/HexagonCard';
import DetailsFloatCard from '../../components/FloatCard/modalViewDetailsFloatCard';
import NewsSection from './news';
import navTop from '../../../data/navTop.json';

function MainDev() {
  const [data] = useFetchData(`/api/home/user/${MoussID}`);
  const [dataNews] = useFetchData('/api/home/news');

  return (
    <>
      {data.user && <Prez Mouss={data.user} />}
      <Navbar navContent={navTop} />
      <HexaSection />
      {dataNews && <NewsSection listNews={dataNews} />}
      <DetailsFloatCard />
    </>

  );
}

export default MainDev;
