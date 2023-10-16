import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { User as UserInfo } from '../../@types/user';
// Nav Items
import navItemsMouss from '../../../data/navItemsMouss.json';
import menuAdmin from '../../../data/navItemsAdmin.json';
import menuESA from '../../../data/navItemsESA.json';
import navItemsUser from '../../../data/navItemsUser.json';
import navTop from '../../../data/navTop.json';
//  CSS
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
// COMPONENTS
import Navbar from '../Navbar';
import Login from '../Auth/login';
import Register from '../Auth/register';
import Footer from '../Footer';
// import Setting from '../User/Setting';
import AsideMenuAdmin from '../Admin/AsideMenu';
import Menu from '../User/AsideMenu';
import ListeRoute from '../Routes';
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
        {/* Menu User */}
        {/* Aside Admin Menu */}
        {(shouldShowAdminMenu || shouldShowESAMenu) && <AsideMenuAdmin navItems={currentMenu} />}

        {/* Main Content */}
        <main
          className={`col ${isAdmin ? 'col-10' : 'col-12'} p-3`}
          style={{ marginTop: 64 }}
        >
          <Navbar navContent={navTop} />
          <ListeRoute />

        </main>
      </div>

      <Footer />
    </>
  );
}

export default App;
