import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import * as bootstrap from 'bootstrap';
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

  const handleClickLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('sessionToken');

    sessionStorage.setItem('notifToast', 'Vous êtes déconnecté');
    // redirect to home
    window.location.replace('/');
  };

  useEffect(() => {
    const asideElement = document.getElementById('aside');
    if (asideElement) {
      const bsOffcanvas = new bootstrap.Offcanvas(asideElement);

      const links = asideElement.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        links[i].addEventListener('click', () => {
          bsOffcanvas.hide();
        });
      }

      return () => {
        bsOffcanvas.dispose();
      };
    }
    return undefined;
  }, []);

  return (
    <aside
      id="aside"
      className="flex-shrink-0 p-3 bg-light offcanvas offcanvas-end w-10 w-sm-100 h-100 bg-white border-right my-5 shadow-lg"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      data-bs-dismiss="true"
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <Nav navItems={navItemsUser as MenuItemsProp[]} />
        {userSession.role.label === 'admin' && (
          <Nav navItems={navItemsAdmin} />
        )}
        <button type="button" className="btn btn-outline-danger" onClickCapture={() => handleClickLogout()}>
          Déconnexion
        </button>

      </ul>
      <hr />
      <Outlet />
    </aside>

  );
}

export default Menu;
