/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from 'react-router-dom';
import { MenuItemsProp } from '../../@types/menu';

interface NavProps {
  navItems: MenuItemsProp[];
}

function Nav({ navItems }: NavProps) {
  return (
    <>
      <li className="border-botton my-1" />
      {
        navItems.map((item: MenuItemsProp) => (
          <li key={item.name} className="nav-intem">
            <NavLink to={item.link} className="nav-link ">
              <i className={`bi bi-${item.icon} px-1`} />
              {item.name}
            </NavLink>
          </li>
        ))
      }
    </>

  );
}

export default Nav;
