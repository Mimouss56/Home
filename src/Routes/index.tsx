import { Routes, Route } from 'react-router-dom';
import Main from '../Pages/Main';
import Cv from '../Pages/CV';
import Logout from '../Pages/Auth/logout';
import Sanction from '../Pages/Sanction';
import Test from '../Pages/Test';
import { User as UserInfo } from '../@types/Home/user';
import Mouss from './Mouss';
import RoutesAdmin from './admin';
import RoutesESA from './ESA';
import RouteDomo from './domotic';
import NotFound from '../Pages/404';
import Portfolio from '../Pages/Portfolio';
import ProtectedRoute from '../components/ProtectedRoute';

function ListeRoute() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;
  const isAdmin = (userSession?.role.label === 'admin');
  const isESA = (userSession?.role.label === 'esa' || userSession?.role.label === 'admin');

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="cv" element={<Cv />} />
      <Route path="about" element={<Cv />} />

      {/* // ProtectedRoute */}
      <Route path="logout" element={(<ProtectedRoute><Logout /></ProtectedRoute>)} />
      <Route path="sanction" element={(<ProtectedRoute><Sanction /></ProtectedRoute>)} />

      <Route path="user/*" element={(<Mouss />)} />
      <Route path="domotic" element={<RouteDomo />} />

      {isAdmin && (<Route path="admin/*" element={(<RoutesAdmin />)} />)}
      {isAdmin && (<Route path="test" element={(<Portfolio />)} />)}
      {isESA && (<Route path="ESA/*" element={(<RoutesESA />)} />)}
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default ListeRoute;
