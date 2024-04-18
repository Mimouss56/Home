import { Suspense } from 'react';
import Navbar from '../../layout/Navbar';
import Prez from './prez';
import HexaSection from '../../components/HexagonCard';
import NewsSection from './news';
import navTop from '../../../data/navTop.json';
import Recommandation from './recommandation';
import Loading from '../../components/Loading';
import Footer from '../../layout/Footer';

function MainDev() {
  return (
    <Suspense fallback={<Loading />}>
      <Prez />
      <Navbar navContent={navTop} />
      <div className="d-none d-md-block">
        <HexaSection />

      </div>
      <Recommandation />
      <NewsSection />
      <Footer />
    </Suspense>
  );
}

export default MainDev;
