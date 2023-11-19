import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { User as UserInfo } from './@types/Home/user';
// Nav Items
import navItemsMouss from '../data/navItemsMouss.json';
import menuAdmin from '../data/navItemsAdmin.json';
import menuESA from '../data/navItemsESA.json';
import navItemsUser from '../data/navItemsUser.json';
import navTop from '../data/navTop.json';
//  CSS
import 'react-toastify/dist/ReactToastify.css';
// COMPONENTS
import Navbar from './layout/Navbar';
import Login from './Pages/Auth/login';
import Register from './Pages/Auth/register';
import Footer from './layout/Footer';
// import Setting from '../User/Setting';
import AsideMenuAdmin from './layout/Admin/aside.menu';
import Menu from './layout/User/aside.user';
import ListeRoute from './Routes';
// User menu
function App() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;
  const isAdmin = (userSession?.role.label === 'admin');
  const isESA = (userSession?.role.label === 'esa' || userSession?.role.label === 'admin');

  const location = useLocation();
  useEffect(() => {
    if (sessionStorage.getItem('notifToast') != null) {
      toast.success(`🦄 ${sessionStorage.getItem('notifToast')} !`);
    }
    sessionStorage.removeItem('notifToast');
  }, []);

  const shouldShowAdminMenu = isAdmin && location.pathname.startsWith('/admin');
  const shouldShowESAMenu = (isAdmin || isESA) && location.pathname.startsWith('/ESA');
  const currentMenu = shouldShowAdminMenu ? menuAdmin : menuESA;

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        theme="dark"
      />

      <Login />
      <Register />

      {userSession && (<Menu navContent={[navItemsUser, navItemsMouss]} />)}

      <div className="d-flex">

        {/* Main Content */}
        <main
          className={`col ${isAdmin ? 'col-10' : 'col-12'} p-3 w-100 mb-5`}
          style={{ marginTop: 64 }}
        >
          {/* Aside Admin Menu */}
          {(shouldShowAdminMenu || shouldShowESAMenu) && <AsideMenuAdmin navItems={currentMenu} />}
          <Navbar navContent={navTop} />
          <ListeRoute />

        </main>
      </div>

      <Footer />
    </>
  );
}

export default App;
