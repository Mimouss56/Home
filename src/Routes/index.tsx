import { Routes, Route } from 'react-router-dom';
import Main from '../Pages/Main';
import ViewCVPage from '../Pages/CV';
import Sanction from '../Pages/Sanction';
import Test from '../Pages/Test';
import { IUser } from '../@types/Home/user';
import Dashboard from './Dashboard';
import RoutesAdmin from './admin';
import RoutesESA from './ESA';
import RouteDomo from './domotic';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../Pages/Error/404';
import Feedback from '../components/Feedback';

function ListeRoute() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as IUser;
  const isAdmin = (userSession?.role.label === 'admin');
  const isESA = (userSession?.role.label === 'esa' || userSession?.role.label === 'admin');

  return (
    <Routes>

      <Route path="/" element={<Main />} />
      <Route path="cv" element={<ViewCVPage />} />
      <Route path="about" element={<ViewCVPage />} />
      <Route path="feedback" element={<Feedback />} />

      {/* // ProtectedRoute */}
      <Route path="sanction" element={(<ProtectedRoute><Sanction /></ProtectedRoute>)} />

      <Route path="user/*" element={(<ProtectedRoute><Dashboard /></ProtectedRoute>)} />
      <Route path="domotic" element={<RouteDomo />} />

      {isAdmin && (<Route path="admin/*" element={(<ProtectedRoute><RoutesAdmin /></ProtectedRoute>)} />)}
      {isAdmin && (<Route path="test" element={(<Test />)} />)}
      {isESA && (<Route path="ESA/*" element={(<ProtectedRoute><RoutesESA /></ProtectedRoute>)} />)}
      <Route path="*" element={<NotFound />} />

    </Routes>

  );
}

export default ListeRoute;
