import { Routes, Route } from 'react-router-dom';
import NotFound from '../notFound';
import Construct from '../UnderContruct';
import PresenceCantine from '../Admin/ESA/cantine';
import ListStudents from '../Admin/ESA/children';

function RoutesESA() {
  return (
    <Routes>
      <Route path="cantine" element={<PresenceCantine />} />
      <Route path="garderie" element={<Construct />} />
      <Route path="activity" element={<Construct />} />
      <Route path="students" element={<ListStudents />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesESA;
