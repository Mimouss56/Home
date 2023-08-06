import { Link, Outlet } from 'react-router-dom';
import { User as UserInfo } from '../../../@types/user';
import { MenuItemsProp } from '../../../@types/menu';

import './style.scss';
import Nav from './Nav';

interface MenuProp {
  navContent: MenuItemsProp[][];
}

function Menu({ navContent }: MenuProp) {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;
  const [navItemsUser, navItemsAdmin] = navContent;

  return (
    <aside
      id="aside"
      className="flex-shrink-0 p-3 bg-light offcanvas offcanvas-end"
      data-bs-backdrop="false"
      data-bs-dismiss="true"
      data-bs-scroll="true"
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <Nav navItems={navItemsUser as MenuItemsProp[]} />
        {userSession.role.label === 'admin' && (
          <Nav navItems={navItemsAdmin} />
        )}
        <Link to="/logout" className="btn btn-outline-danger">
          Déconnexion
        </Link>

      </ul>
      <hr />
      <Outlet />
    </aside>

  );
}

export default Menu;
