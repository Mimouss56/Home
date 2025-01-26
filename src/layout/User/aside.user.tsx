import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import * as bootstrap from 'bootstrap';
import Nav from '../../components/Menu/asideUserNav';
import useMeStore from '../../store/me.store';
import navItemsUser from '../../../data/navItemsUser.json';

const handleClickLogout = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('sessionToken');
  sessionStorage.removeItem('dataNotif');
  sessionStorage.setItem('notifToast', 'Vous êtes déconnecté !');
  window.location.replace('/');
};

function AsideUserMenu() {
  const { me: user } = useMeStore((state) => state);

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
        <Nav navItems={navItemsUser} />

        {user?.role.label === 'admin' && (
          <Nav navItems={[
            {
              id: 1,
              name: 'Espace Admin',
              link: '/admin',
              icon: 'setting',
              component: 'Admin',
            },
          ]}
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
