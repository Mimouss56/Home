import { Routes, Route } from 'react-router-dom';
import Kanban from '../Pages/Kanban';
import Setting from '../Pages/Dashboard';
import RenderCv from '../Pages/CV/rendercv';
import NotFound from '../Pages/Error/404';
import RoutesUser from './ent';

function DashboardRouter() {
  return (
    <Routes>
      <Route path="setting" element={(<Setting />)} />
      <Route path="kanban" element={<Kanban />} />
      <Route path="rendercv" element={<RenderCv />} />
      <Route path="emploi/*" element={<RoutesUser />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default DashboardRouter;
