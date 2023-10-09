import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { User as UserInfo } from '../../@types/user';
import menuAdmin from '../../../data/navItemsAdmin.json';
import navItemsUser from '../../../data/navItemsUser.json';
import navTop from '../../../data/navTop.json';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import Navbar from '../Navbar';
import Login from '../Auth/login';
import Logout from '../Auth/logout';
import Register from '../Register';
import User from '../User';
import Sanction from '../Modules/Sanction';
import Cv from '../Cv';
import Footer from '../Footer';
// import Setting from '../User/Setting';
import ProtectedRoute from '../ProtectedRoute';
import Main from '../Main';
import Admin from '../Admin';
import AsideMenuAdmin from '../Admin/AsideMenu';
import Menu from '../User/AsideMenu';
// User menu
function App() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;
  const isAdmin = (userSession?.role.label === 'admin');

  const location = useLocation();
  useEffect(() => {
    if (sessionStorage.getItem('notifToast') != null) {
      toast.success(`🦄 ${sessionStorage.getItem('notifToast')} !`);
    }
    sessionStorage.removeItem('notifToast');
  }, []);

  return (
    <>
      {userSession && <Menu navContent={[navItemsUser]} />}
      <div className="d-flex">
        {/* Aside Menu */}
        {isAdmin && location.pathname.startsWith('/admin') && (
          <div className="col-2 p-0">
            <ProtectedRoute>
              <AsideMenuAdmin navItems={menuAdmin} />
            </ProtectedRoute>
          </div>
        )}

        {/* Main Content */}
        <main
          className={`col ${isAdmin ? 'col-10' : 'col-12'} p-3`}
          style={{ marginTop: 64 }}
        >
          <Navbar navContent={navTop} />
          <ToastContainer
            position="top-left"
            autoClose={5000}
            theme="dark"
          />

          <Login />
          <Register />

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="cv" element={<Cv />} />
            <Route path="about" element={<Cv />} />
            <Route
              path="logout"
              element={(
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              )}
            />
            <Route
              path="user/*"
              element={(
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              )}
            />
            {(userSession?.role.label === 'admin') ? (
              <Route
                path="admin/*"
                element={(
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                )}
              />
            ) : null}

            <Route
              path="sanction"
              element={(
                <ProtectedRoute>
                  <Sanction />
                </ProtectedRoute>
              )}
            />
          </Routes>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default App;
