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
import Login from './components/Modal/Auth/login';
import Register from './components/Modal/Auth/register';
import Footer from './layout/Footer';
// import Setting from '../User/Setting';
import AsideMenuAdmin from './layout/Admin/aside.menu';
import Menu from './layout/User/aside.user';
import ListeRoute from './Routes';

// si le mois actuelle est 12 alors on import le style de noel
if (new Date().getMonth() === 11) {
  import('./scss/christmasTheme.scss');
}
// User menu
function App() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;
  const isAdmin = (userSession?.role.label === 'admin');
  const isESA = (userSession?.role.label === 'esa' || userSession?.role.label === 'admin');

  const location = useLocation();
  useEffect(() => {
    // document.title = "Nom de Ton Site"; // Remplace par le nom de ton site
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
      {new Date().getMonth() === 11 && (
        [...Array(150)].map((index) => (
          <div key={index} className="snow" />
        ))
      )}

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
