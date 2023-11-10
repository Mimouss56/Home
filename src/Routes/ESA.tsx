import { Routes, Route } from 'react-router-dom';
import NotFound from '../Pages/404';
import Construct from '../Pages/UnderContruct';
import PresenceCantine from '../Pages/Admin/ESA/cantine';
import ListStudents from '../Pages/Admin/ESA/children';
import ESA from '../Pages/Admin/ESA';

function RoutesESA() {
  return (
    <section style={{ marginLeft: '15vw' }}>
      <Routes>
        <Route path="/" element={<ESA />} />
        <Route path="cantine" element={<PresenceCantine />} />
        <Route path="garderie" element={<Construct />} />
        <Route path="activity" element={<Construct />} />
        <Route path="students" element={<ListStudents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default RoutesESA;
