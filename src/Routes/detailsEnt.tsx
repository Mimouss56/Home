import { Routes, Route, useParams } from 'react-router-dom';
import NotFound from '../Pages/Error/404';
import DetailsEntreprise from '../Pages/Emploi/ent';

function RoutesEnt() {
  const params = useParams();
  return (
    <Routes>
      <Route path="/details" element={<DetailsEntreprise id={Number(params.id)} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesEnt;
