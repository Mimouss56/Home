import { Routes, Route } from 'react-router-dom';
import NotFound from '../Pages/Error/404';
import EmploiPage from '../Pages/Emploi';
import RoutesEnt from './detailsEnt';

function RoutesUser() {
  return (
    <Routes>
      <Route path="/" element={<EmploiPage />} />
      <Route path="ent/:id/*" element={<RoutesEnt />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesUser;
