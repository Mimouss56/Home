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
import Cv from '../Cv';
import Footer from '../Footer';
// import Setting from '../User/Setting';
import ProtectedRoute from '../ProtectedRoute';
import Main from '../Main';
import Admin from '../Admin';

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
          <Route
            path="sanction"
            element={(
              <ProtectedRoute>
                <Sanction />
              </ProtectedRoute>
            )}
          />

          {userSession?.role.label === 'admin' && (
            <Route
              path="admin/*"
              element={(
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              )}
            />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
