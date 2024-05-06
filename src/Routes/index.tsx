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
import Pokedex from '../Pages/Pokedex';
import { userContext } from '../store/user.context';

function ListeRoute() {
  const { user } = useContext(userContext);
  const isAdmin = user?.role.id === 1;
  const isESA = user?.role.label === 'esa' || user?.role.label === 'admin';

  return (
    <Routes>
      <Route path="/" element={<MainDev />} />
      <Route path={'cv' || 'about'} element={<ViewCVPage />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="test" element={(<Pokedex />)} />
      {/* // ProtectedRoute */}
      <Route path="sanction" element={(<ProtectedRoute><Sanction /></ProtectedRoute>)} />

      <Route path="user/*" element={(<ProtectedRoute><Dashboard /></ProtectedRoute>)} />
      <Route path="domotic" element={<RouteDomo />} />

      {isAdmin && (<Route path="admin/*" element={(<ProtectedRoute><PageAdminHome /></ProtectedRoute>)} />)}
      {isESA && (<Route path="ESA/*" element={(<ProtectedRoute><RoutesESA /></ProtectedRoute>)} />)}
      <Route path="*" element={<NotFound />} />

    </Routes>

  );
}

export default ListeRoute;
