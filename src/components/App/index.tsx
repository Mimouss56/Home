import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { User as UserInfo } from '../../@types/user';
// Data Import
import emplois from '../../../data/emploi.json';
import formation from '../../../data/formation.json';
import navItemsAdmin from '../../../data/navItemsAdmin.json';
import navItemsUser from '../../../data/navItemsUser.json';
import navTop from '../../../data/navTop.json';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
// Classic Import
import Under from '../UnderContruct';
import Cv from '../Cv';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Login from '../Login';
import Register from '../Register';
import NotFound from '../notFound';
// User Import
import User from '../User';
import Job from '../User/Job';
import Setting from '../User/Setting';
// Admin Import
import Dashboard from '../Admin';
import Logout from '../Logout';
import Menu from '../User/AsideMenu';
import Sanction from '../Sanction';

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
          <Route path="/">
            <Route index element={<Under />} />
            <Route path="cv" element={<Cv />} />
            <Route path="about" element={<Cv />} />
            <Route path="logout" element={<Logout />} />
            {userSession && (
              <>
                <Route path="user">
                  <Route index element={<User />} />
                  <Route path="setting" element={<Setting />} />
                  <Route path="jobs" element={<Job jobs={emplois} />} />
                  <Route path="school" element={<Job jobs={formation} />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="sanction" element={<Sanction />} />

                {userSession.role.label === 'admin' && (
                  <Route path="admin/">
                    <Route path="dashboard" element={<Dashboard />} />
                  </Route>
                )}
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
