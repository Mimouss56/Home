import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import * as bootstrap from 'bootstrap';
import { User as UserInfo } from '../../@types/Home/user';
import { MenuItemsProp } from '../../@types/menu';

import './style.scss';
import Nav from '../../components/Menu/asideUserNav';
import ProtectedRoute from '../../components/ProtectedRoute';

interface MenuProp {
  navContent: MenuItemsProp[][];
}

function Menu({ navContent }: MenuProp) {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;
  const isAdmin = (userSession.role.label === 'admin');
  const isESA = (userSession.role.label === 'esa' || userSession.role.label === 'admin');
  const isMouss = (userSession.username === 'Mouss');
  const isFamily = userSession.family;
  const [navItemsUser, navItemsMouss] = navContent;

  const handleClickLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('dataNotif');
    sessionStorage.setItem('notifToast', 'Vous êtes déconnecté !');
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
    <ProtectedRoute>
      <aside
        id="aside"
        className="flex-shrink-0 p-3 bg-light offcanvas offcanvas-end w-10 w-sm-100 h-100 bg-white border-right my-5 shadow-lg"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        data-bs-dismiss="true"
      >
        <ul className="nav nav-pills flex-column mb-auto">
          <Nav navItems={navItemsUser as MenuItemsProp[]} />
          {isMouss && navItemsMouss && (
            <Nav navItems={navItemsMouss as MenuItemsProp[]} />
          )}
          {(isAdmin || userSession.child) && (
            <Nav navItems={[{
              id: 4,
              title: 'Sanction',
              link: '/sanction',
              icon: 'bandaid',
              component: 'Sanction',
            }] as MenuItemsProp[]}
            />
          )}
          {/* {isFamily && (
            <Nav navItems={[{
              id: 4,
              title: 'Domotic',
              link: '/domotic',
              icon: 'plug',
              component: 'Sanction',
            }] as MenuItemsProp[]}
            />

          )} */}
          {isESA && (
            <Nav navItems={[
              {
                id: 1,
                title: 'ESA',
                link: '/ESA',
                icon: 'setting',
                component: 'Admin',
              },
            ] as MenuItemsProp[]}
            />
          )}

          {isAdmin && (
            <Nav navItems={[
              {
                id: 1,
                title: 'Espace Admin',
                link: '/admin',
                icon: 'setting',
                component: 'Admin',
              },
            ] as MenuItemsProp[]}
            />
          )}
          <button type="button" className="btn btn-outline-danger" onClickCapture={() => handleClickLogout()}>
            Déconnexion
          </button>

        </ul>
        <hr />
        <Outlet />
      </aside>

    </ProtectedRoute>

  );
}

export default Menu;
