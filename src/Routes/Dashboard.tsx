import { Routes, Route } from 'react-router-dom';
import Section from '../components/Mouss/section';
import Kanban from '../Pages/Kanban';
import Setting from '../Pages/Dashboard';
import RenderCv from '../Pages/CV/rendercv';
import NotFound from '../Pages/Error/404';
import Portfolio from '../Pages/Portfolio';
import EmploiPage from '../Pages/Emploi';

function Dashboard() {
  return (
    <Routes>
      <Route path="setting" element={(<Setting />)} />
      {/* <Route path="jobs" element={<Section title="Emploi" type="job" />} /> */}
      {/* <Route path="school" element={<Section title="Formation" type="school" />} /> */}
      <Route path="kanban" element={<Kanban />} />
      <Route path="rendercv" element={<RenderCv />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="emploi/*" element={<EmploiPage />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default Dashboard;
