import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ViewCVPage from '../Pages/CV';
import Sanction from '../Pages/Sanction';
import Test from '../Pages/Test';
import { IUser } from '../@types/Home/user';
import Dashboard from './Dashboard';
import RoutesESA from './ESA';
import RouteDomo from './domotic';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../Pages/Error/404';
import Feedback from '../components/Feedback';
import MainDev from '../Pages/Main_2';
import PageAdminHome from '../layout/Admin/index';
import useFetchData from '../hook/useFetchData';

function ListeRoute() {
  // const userSession = JSON.parse(sessionStorage.getItem('user') as string) as IUser;
  const [dataMe] = useFetchData('/api/home/@me');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isESA, setIsESA] = useState(false);

  useEffect(() => {
    if (typeof dataMe !== 'object') {
      console.log(dataMe);

      setIsAdmin(dataMe?.role.label === 'admin');
      // const isAdmin = (dataMe?.role.label === 'admin');
      setIsESA(dataMe?.role.label === 'esa' || dataMe?.role.label === 'admin');
    }
  }, [dataMe]);

  return (
    <Routes>
      <Route path="/" element={<MainDev />} />
      <Route path={'cv' || 'about'} element={<ViewCVPage />} />
      <Route path="feedback" element={<Feedback />} />

      {/* // ProtectedRoute */}
      <Route path="sanction" element={(<ProtectedRoute><Sanction /></ProtectedRoute>)} />

      <Route path="user/*" element={(<ProtectedRoute><Dashboard /></ProtectedRoute>)} />
      <Route path="domotic" element={<RouteDomo />} />

      {isAdmin && (<Route path="admin/*" element={(<ProtectedRoute><PageAdminHome /></ProtectedRoute>)} />)}
      {isAdmin && (<Route path="test" element={(<Test />)} />)}
      {isESA && (<Route path="ESA/*" element={(<ProtectedRoute><RoutesESA /></ProtectedRoute>)} />)}
      <Route path="*" element={<NotFound />} />

    </Routes>

  );
}

export default ListeRoute;
