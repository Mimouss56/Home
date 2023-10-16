import { Routes, Route } from 'react-router-dom';
import ESA from '../Admin/ESA';
import NotFound from '../notFound';

function RoutesESA() {
  return (
    <Routes>
      <Route path="cantine" element={<ESA />} />
      <Route path="garderie" element={<ESA />} />
      <Route path="activity" element={<ESA />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesESA;
