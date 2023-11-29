import { Route, Routes } from 'react-router-dom';
import Test from '../Pages/Test';

function RouteDomotic() {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  );
}

export default RouteDomotic;
