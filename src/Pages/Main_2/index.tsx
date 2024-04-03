import { Suspense } from 'react';
import useFetchData from '../../hook/useFetchData';
import { MoussID } from '../../../config.json';
import Navbar from '../../layout/Navbar';
import Prez from './prez';
import HexaSection from '../../components/HexagonCard';
import NewsSection from './news';
import navTop from '../../../data/navTop.json';
import Recommandation from './recommandation';
import Loading from '../../components/Loading';
import SkillSection from './skill';

function MainDev() {
  const [data, loadingData] = useFetchData(`/api/home/user/${MoussID}`);
  const [dataNews, loadingNews] = useFetchData('/api/home/news');

  return (
    <Suspense fallback={<Loading />}>
      {data.user && <Prez Mouss={data.user} />}
      {(!loadingData && !loadingNews) && (
        <>
          <Navbar navContent={navTop} />
          <SkillSection />
          <HexaSection />
          <Recommandation />
          {dataNews && <NewsSection listNews={dataNews} />}
        </>
      )}
    </Suspense>
  );
}

export default MainDev;
