import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { User as UserInfo } from '../../@types/user';
// Data Import
import emplois from '../../../data/emploi.json';
import formation from '../../../data/formation.json';
import navItemsAdmin from '../../../data/navItemsAdmin.json';
import navItemsUser from '../../../data/navItemsUser.json';
import navTop from '../../../data/navTop.json';
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
import Toast from '../notifToast';
import Sanction from '../Sanction';

function App() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;
  const [notifToast, setnotifToast] = useState(sessionStorage.getItem('notifToast'));
  useEffect(
    () => {
      if (notifToast) {
        setTimeout(() => {
          sessionStorage.removeItem('notifToast');
          setnotifToast('');
        }, 2000);
      }
    },
    [notifToast],
  );
  return (
    <>
      {userSession && (<Menu navContent={[navItemsUser, navItemsAdmin]} />)}

      {notifToast && <Toast text={notifToast} color="success" />}
      <main className="d-flex flex-row">
        <Navbar navContent={navTop} />
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
                  <Route path="sanction" element={<Sanction />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
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
