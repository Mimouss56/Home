import { Suspense } from 'react';
import Navbar from '../../layout/Navbar';
import Loading from '../../components/Loading';
import navTop from '../../../data/navTop.json';
import Prez from './prez';
import HexaSection from './portfolio';
import NewsSection from './news';
import Recommandation from './recommandation';

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
