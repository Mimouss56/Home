import { Suspense, useEffect } from 'react';
import useFetchData from '../../hook/useFetchData';
import { MoussID } from '../../../config.json';
import Navbar from '../../layout/Navbar';
import Prez from './prez';
import HexaSection from '../../components/HexagonCard';
import DetailsFloatCard from '../../components/FloatCard/modalViewDetailsFloatCard';
import NewsSection from './news';
import navTop from '../../../data/navTop.json';
import Recommandation from './recommandation';
import Loading from '../../components/Loading';

function MainDev() {
  const [data] = useFetchData(`/api/home/user/${MoussID}`);
  const [dataNews] = useFetchData('/api/home/news');
  const nav = document.querySelector('nav');
  const sticky = nav?.offsetTop || null;

  useEffect(() => {
    const scrollCallBack = () => {
      if (sticky !== null && window.scrollY > sticky) {
        nav?.classList.add('fixed-top');
      } else {
        nav?.classList.remove('fixed-top');
      }
    };
    window.addEventListener('scroll', scrollCallBack);
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, [nav, sticky]);

  return (
    <Suspense fallback={<Loading />}>
      { data.user && <Prez Mouss={data.user} />}
      <Navbar navContent={navTop} />
      <HexaSection />
      <Recommandation />
      {dataNews && <NewsSection listNews={dataNews} />}
      <DetailsFloatCard />
    </Suspense>
  );
}

export default MainDev;
