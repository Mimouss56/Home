import { Routes, Route } from 'react-router-dom';
import NotFound from '../Pages/Error/404';
import EmploiPage from '../Pages/Emploi';
import RoutesEnt from './detailsEnt';
import { EntProvider } from '../store/ent.context';

function RoutesUser() {
  return (
    <EntProvider>
      <Routes>
        <Route path="/" element={<EmploiPage />} />
        <Route path="ent/:id/*" element={<RoutesEnt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </EntProvider>
  );
}

export default RoutesUser;
