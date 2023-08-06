import { Link, NavLink, Outlet } from 'react-router-dom';
import { MenuItemsProp } from '../../../@types/menu';

interface NavProps {
  navItems: MenuItemsProp[];
}

function Nav({ navItems }: NavProps) {
  return (
    <>
      <li className="border-top my-3" />
      {
        navItems.map((item: MenuItemsProp) => (
          <li key={item.id} className="nav-intem">
            <Link to={item.link} className="nav-link ">
              <i className={`bi bi-${item.icon} px-1`} />
              {item.title}
            </Link>
          </li>
        ))
      }
    </>

  );
}

export default Nav;
