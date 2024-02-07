import { Routes, Route } from 'react-router-dom';
import EmploiPage from '../Pages/Admin/Home/Emploi';
import DetailsEntreprise from '../Pages/Admin/Home/Emploi/ent';

function RouteEmploi() {
  return (
    <Routes>
      <Route path="ent/:idEnt" element={<DetailsEntreprise />} />

      <Route path="*" element={<EmploiPage />} />

    </Routes>
  );
}

export default RouteEmploi;
