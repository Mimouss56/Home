import { useLocation } from 'react-router-dom';
import { IUser } from '../../@types/Home/user';

import menuAdmin from '../../../data/navItemsAdmin.json';
import menuESA from '../../../data/navItemsESA.json';
import navTop from '../../../data/navTop.json';
import AsideMenuAdmin from '../../layout/Admin/aside.menu';
import ListeRoute from '../../Routes';
import Navbar from '../../layout/Navbar';

function Main() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as IUser;
  const location = useLocation();

  const isAdmin = (userSession && userSession.role.label === 'admin');
  const isESA = (userSession && (userSession.role.label === 'esa' || userSession.role.label === 'admin'));

  const shouldShowAdminMenu = isAdmin && location.pathname.startsWith('/admin');
  const shouldShowESAMenu = (isAdmin || isESA) && location.pathname.startsWith('/ESA');
  const currentMenu = shouldShowAdminMenu ? menuAdmin : menuESA;

  return (
    <div className="d-flex">

      {/* Main Content */}
      <main
        className={`col ${isAdmin ? 'col-10' : 'col-12'} p-3 w-100 mb-5 `}
        style={{ marginTop: 64 }}
      >
        {/* Aside Admin Menu */}
        {(shouldShowAdminMenu || shouldShowESAMenu) && <AsideMenuAdmin navItems={currentMenu} />}
        <Navbar navContent={navTop} />
        <ListeRoute />

      </main>
    </div>
  );
}

export default Main;
