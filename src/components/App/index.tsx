import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { User as UserInfo } from '../../@types/user';
import navItemsAdmin from '../../../data/navItemsAdmin.json';
import navItemsUser from '../../../data/navItemsUser.json';
import navTop from '../../../data/navTop.json';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import Navbar from '../Navbar';
import Login from '../Login';
import Register from '../Register';
import NotFound from '../notFound';
import User from '../User';
import Sanction from '../Sanction';
import Logout from '../Logout';
import Menu from '../User/AsideMenu';
import Dashboard from '../Admin';
import Under from '../UnderContruct';
import Cv from '../Cv';
import Footer from '../Footer';
import Job from '../User/Job';
import Setting from '../User/Setting';
import ProtectedRoute from '../ProtectedRoute';

function App() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;

  useEffect(() => {
    if (sessionStorage.getItem('notifToast') != null) {
      toast.success(`🦄 ${sessionStorage.getItem('notifToast')} !`);
    }
    sessionStorage.removeItem('notifToast');
  }, []);

  return (
    <>
      {userSession && (<Menu navContent={[navItemsUser, navItemsAdmin]} />)}

      <main className="d-flex flex-row">
        <Navbar navContent={navTop} />
        <ToastContainer
          position="top-left"
          autoClose={5000}
          theme="dark"
        />

        <Login />
        <Register />

        <Routes>
          <Route path="/" element={<Under />} />
          <Route path="cv" element={<Cv />} />
          <Route path="about" element={<Cv />} />
          <ProtectedRoute>
            <Route path="logout" element={<Logout />} />
          </ProtectedRoute>
          <ProtectedRoute>
            <Route path="user/*" element={<User />} />
          </ProtectedRoute>
          <ProtectedRoute>
            <Route path="user/setting" element={<Setting />} />
          </ProtectedRoute>
          <ProtectedRoute>
            <Route path="sanction" element={<Sanction />} />
          </ProtectedRoute>

          {userSession?.role.label === 'admin' && (
            <ProtectedRoute>

              <Route path="admin/dashboard" element={<Dashboard />} />
            </ProtectedRoute>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
