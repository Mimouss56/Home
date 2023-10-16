import { Routes, Route } from 'react-router-dom';
import Main from '../Main';
import Cv from '../Cv';
import Logout from '../Auth/logout';
import Sanction from '../Modules/Sanction';
import Test from '../Test';
import { User as UserInfo } from '../../@types/user';
import Mouss from './Mouss';
import RoutesAdmin from './admin';
import RoutesESA from './ESA';
import Setting from '../User/Setting';

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
      <Route path="logout" element={(<Logout />)} />
      <Route path="sanction" element={(<Sanction />)} />
      {isAdmin && (<Route path="test" element={(<Test />)} />)}

      <Route path="user/setting" element={(<Setting />)} />
      <Route path="user/*" element={(<Mouss />)} />
      {isAdmin && (<Route path="admin/*" element={(<RoutesAdmin />)} />)}

      {isESA && (<Route path="ESA/*" element={(<RoutesESA />)} />)}

    </Routes>

  );
}

export default ListeRoute;
