import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import ViewCVPage from '../Pages/CV';
import Sanction from '../Pages/Sanction';
// import Test from '../Pages/Test';
import Dashboard from './Dashboard';
import RoutesESA from './ESA';
import RouteDomo from './domotic';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../Pages/Error/404';
import Feedback from '../components/Feedback';
import MainDev from '../Pages/Main_2';
import PageAdminHome from '../layout/Admin/index';
import { userContext } from '../store/user.context';
import { EntProvider } from '../store/ent.context';
import Test from '../Pages/Test';
import NewsSection from '../Pages/Main_2/news';
import { SoftSkillProvider } from '../store/skill.context';
import { SanctionProvider } from '../store/sanction.context';

function ListeRoute() {
  const { user } = useContext(userContext);
  const isAdmin = user?.role.id === 1;
  const isESA = user?.role.label === 'esa' || isAdmin;

  return (
    <Routes>
      <Route path="/" element={<MainDev />} />
      <Route path={'cv' || 'about'} element={<EntProvider><SoftSkillProvider><ViewCVPage /></SoftSkillProvider></EntProvider>} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="changelog" element={(<NewsSection />)} />
      <Route path="test" element={(<Test />)} />
      {/* // ProtectedRoute */}
      <Route path="sanction" element={(<ProtectedRoute><SanctionProvider><Sanction /></SanctionProvider></ProtectedRoute>)} />

      <Route path="user/*" element={(<ProtectedRoute><Dashboard /></ProtectedRoute>)} />
      <Route path="domotic" element={<RouteDomo />} />

      {isAdmin && (<Route path="admin/*" element={(<ProtectedRoute><PageAdminHome /></ProtectedRoute>)} />)}
      {isESA && (<Route path="ESA/*" element={(<ProtectedRoute><RoutesESA /></ProtectedRoute>)} />)}
      <Route path="*" element={<NotFound />} />

    </Routes>

  );
}

export default ListeRoute;
