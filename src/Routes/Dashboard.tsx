import { Routes, Route } from 'react-router-dom';
import Kanban from '../Pages/Kanban';
import Setting from '../Pages/Dashboard';
import RenderCv from '../Pages/CV/rendercv';
import NotFound from '../Pages/Error/404';
import Portfolio from '../Pages/Portfolio';
import RoutesUser from './ent';

function Dashboard() {
  return (
    <Routes>
      <Route path="setting" element={(<Setting />)} />
      <Route path="kanban" element={<Kanban />} />
      <Route path="rendercv" element={<RenderCv />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="emploi/*" element={<RoutesUser />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default Dashboard;
