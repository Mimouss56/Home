import { Link, Outlet } from 'react-router-dom';
import { User as UserInfo } from '../../../@types/user';
import { MenuItemsProp } from '../../../@types/menu';

import './style.scss';
import Nav from './Nav';

const navItemsUser = [
  {
    id: 1,
    title: 'Profil',
    link: '/user/setting',
    icon: 'person',
  },
  {
    id: 2,
    title: 'Jobs',
    link: '/user/jobs',
    icon: 'briefcase',
  },
  {
    id: 3,
    title: 'School',
    link: '/user/school',
    icon: 'book',
  },

] as MenuItemsProp[];

const navItemsAdmin = [
  {
    id: 1,
    title: 'Dashboard',
    link: '/admin',
    icon: 'speedometer2',
  },
  {
    id: 2,
    title: 'Users',
    link: '/admin/users',
    icon: 'people',
  },
  {
    id: 3,
    title: 'Jobs',
    link: '/admin/jobs',
    icon: 'briefcase',
  },
  {
    id: 4,
    title: 'Schools',
    link: '/admin/schools',
    icon: 'book',
  },
] as MenuItemsProp[];

function Menu() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;

  return (
    <div
      id="aside"
      className="flex-shrink-0 p-3 bg-light offcanvas offcanvas-end"
      data-bs-backdrop="false"
      data-bs-dismiss="true"
      data-bs-scroll="true"
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <Nav navItems={navItemsUser} />
        {
          userSession.role.label === 'admin' && (
            <Nav navItems={navItemsAdmin} />
          )
        }

      </ul>
      <Outlet />
    </div>

  );
}

export default Menu;
