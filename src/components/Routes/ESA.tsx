import { Routes, Route } from 'react-router-dom';
import Test from '../Test';

function RoutesESA() {
  return (
    <Routes>
      <Route path="cantine" element={<Test />} />
      <Route path="garderie" element={<Test />} />
      <Route path="activity" element={<Test />} />
    </Routes>
  );
}

export default RoutesESA;
