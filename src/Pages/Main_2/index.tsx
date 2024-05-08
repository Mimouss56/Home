import { Suspense } from 'react';
import Loading from '../../components/Loading';
import Prez from './prez';
import HexaSection from './portfolio';
import NewsSection from './news';
import Recommandation from './recommandation';
import Navbar from '../../layout/Navbar';
import navTop from '../../../data/navTop.json';

function MainDev() {
  return (
    <Suspense fallback={<Loading />}>
      <Prez />
      <Navbar navContent={navTop} />
      <HexaSection />
      <Recommandation />
      <NewsSection />
    </Suspense>
  );
}

export default MainDev;
