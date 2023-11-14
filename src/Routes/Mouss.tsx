import { Routes, Route } from 'react-router-dom';
import { User as UserInfo } from '../@types/Home/user';
import Section from '../components/Mouss/section';
import Kanban from '../Pages/Kanban';

function Mouss() {
  const userInfos = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;

  return (
    <Routes>
      <Route path="jobs" element={<Section title="Emploi" initialItems={userInfos?.job || []} type="job" />} />
      <Route path="school" element={<Section title="Formation" initialItems={userInfos?.school || []} type="school" />} />
      <Route path="kanban" element={<Kanban />} />
    </Routes>
  );
}

export default Mouss;