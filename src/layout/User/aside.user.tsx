import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import * as bootstrap from 'bootstrap';
import { MenuItemsProp } from '../../@types/menu';
import useUserStore from '../../store/user.store';
import Nav from '../../components/Menu/asideUserNav';

interface MenuProp {
  navContent: MenuItemsProp[][];
}

function AsideUserMenu({ navContent }: MenuProp) {
  const userSession = useUserStore((state) => state.user);
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
    <aside
      id="aside"
      className="flex-shrink-0 p-3 bg-light offcanvas offcanvas-end w-10 w-sm-100 h-100 bg-white border-right shadow-lg position-fixed end-0 border"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      data-bs-dismiss="offcanvas"

    >
      <ul className="nav nav-pills flex-column mb-auto p-0 m-0 list-unstyled ">
        <Nav navItems={navItemsUser as MenuItemsProp[]} />
        {userSession?.username === 'Mouss' && navItemsMouss && (
          <Nav navItems={navItemsMouss as MenuItemsProp[]} />
        )}
        {(userSession?.role.label === 'admin' || userSession?.child) && (
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
        {(userSession?.role.label === 'esa' || userSession?.role.label === 'admin') && (
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

        {userSession?.role.label === 'admin' && (
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

  );
}

export default AsideUserMenu;
