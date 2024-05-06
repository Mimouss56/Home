/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { MenuItemsProp } from '../../@types/menu';

interface MenuProp {
  navItems: MenuItemsProp[];
}

function AsideMenuAdmin({ navItems }: MenuProp) {
  return (
    <div
      id="aside-menu-admin"
      className="d-flex flex-column text-bg-dark bg-dark col-2 vh-100"
    >
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item: MenuItemsProp) => (
          <li key={item.title} className="nav-item">
            <Link to={item.link} className="nav-link d-flex align-items-center text-light">
              <i className={`bi bi-${item.icon} mx-2`} />
              <span className="d-none d-md-block">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AsideMenuAdmin;
