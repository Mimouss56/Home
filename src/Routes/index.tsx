import { Routes, Route } from 'react-router-dom';
import Main from '../Pages/Main';
import ViewCVPage from '../Pages/CV';
import Sanction from '../Pages/Sanction';
import Test from '../Pages/Test';
import { User as UserInfo } from '../@types/Home/user';
import Dashboard from './Dashboard';
import RoutesAdmin from './admin';
import RoutesESA from './ESA';
import RouteDomo from './domotic';
import ProtectedRoute from '../components/ProtectedRoute';

function ListeRoute() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;
  const isAdmin = (userSession?.role.label === 'admin');
  const isESA = (userSession?.role.label === 'esa' || userSession?.role.label === 'admin');

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="cv" element={<ViewCVPage />} />
      <Route path="about" element={<ViewCVPage />} />

      {/* // ProtectedRoute */}
      <Route path="sanction" element={(<ProtectedRoute><Sanction /></ProtectedRoute>)} />

      <Route path="user/*" element={(<ProtectedRoute><Dashboard /></ProtectedRoute>)} />
      <Route path="domotic" element={<RouteDomo />} />

      {isAdmin && (<Route path="admin/*" element={(<RoutesAdmin />)} />)}
      {isAdmin && (<Route path="test" element={(<Test />)} />)}
      {isESA && (<Route path="ESA/*" element={(<RoutesESA />)} />)}
    </Routes>

  );
}

export default ListeRoute;
