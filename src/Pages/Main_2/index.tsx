import { Suspense } from 'react';
import Loading from '../../components/Loading';
import Prez from './prez';
import HexaSection from './portfolio';
import Recommandation from './recommandation';
import Navbar from '../../layout/Navbar';

function MainDev() {
  return (
    <Suspense fallback={<Loading />}>
      <Prez />
      <Navbar />
      <HexaSection />
      <Recommandation />
    </Suspense>
  );
}

export default MainDev;
