import { Routes, Route, Navigate } from 'react-router-dom';
import Section from '../components/Mouss/section';
import Kanban from '../Pages/Kanban';
import Setting from '../Pages/Dashboard';
import RenderCv from '../Pages/CV/rendercv';

function Dashboard() {
  return (
    <Routes>
      <Route path="setting" element={(<Setting />)} />
      <Route path="jobs" element={<Section title="Emploi" type="job" />} />
      <Route path="school" element={<Section title="Formation" type="school" />} />
      <Route path="kanban" element={<Kanban />} />
      <Route path="rendercv" element={<RenderCv />} />
      <Route path="*" element={<Navigate to="../Pages/Error/404.html" />} />

    </Routes>
  );
}

export default Dashboard;