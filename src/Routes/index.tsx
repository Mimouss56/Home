import { Routes, Route } from 'react-router-dom';

// import Test from '../Pages/Test';
import RouteDashboard from './Dashboard';
import RoutesESA from './ESA';
import RouteDomo from './domotic';

import ProtectedRoute from '../components/ProtectedRoute';
import Feedback from '../components/Feedback';

import NotFound from '../Pages/Error/404';
import MainDev from '../Pages/Main_2';
import ViewCVPage from '../Pages/CV';
import Sanction from '../Pages/Sanction';
import Test from '../Pages/Test';
import NewsSection from '../Pages/Main_2/news';
import AccueilPage from '../Pages/Accueil';

import PageAdminHome from '../layout/Admin/index';

import { SoftSkillProvider } from '../store/skill.context';
import { SanctionProvider } from '../store/sanction.context';
import { EntProvider } from '../store/ent.context';
import useMeStore from '../store/me.store';

function ListeRoute() {
  const { me: user } = useMeStore((state) => state);
  const isAdmin = user?.role.id === 1;
  const isESA = user?.role.label === 'esa' || isAdmin;

  return (
    <Routes>
      <Route path="/" element={<MainDev />} />
      <Route path="accueil" element={<AccueilPage />} />
      <Route path={'cv' || 'about'} element={<EntProvider><SoftSkillProvider><ViewCVPage /></SoftSkillProvider></EntProvider>} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="changelog" element={(<NewsSection />)} />
      <Route path="test" element={(<Test />)} />
      {/* // ProtectedRoute */}
      <Route path="sanction" element={(<ProtectedRoute><SanctionProvider><Sanction /></SanctionProvider></ProtectedRoute>)} />

      <Route path="user/*" element={(<ProtectedRoute><RouteDashboard /></ProtectedRoute>)} />
      <Route path="domotic" element={<RouteDomo />} />

      {isAdmin && (<Route path="admin/*" element={(<ProtectedRoute><PageAdminHome /></ProtectedRoute>)} />)}
      {isESA && (<Route path="ESA/*" element={(<ProtectedRoute><RoutesESA /></ProtectedRoute>)} />)}
      <Route path="*" element={<NotFound />} />

    </Routes>

  );
}

export default ListeRoute;
