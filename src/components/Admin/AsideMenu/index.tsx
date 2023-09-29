import { Link } from 'react-router-dom';
import { MenuItemsProp } from '../../../@types/menu';

interface MenuProp {
  navItems: MenuItemsProp[];
}

function AsideMenuAdmin({ navItems }: MenuProp) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark w-240 w-md-auto"
      style={
        {
          bottom: 0,
          top: 64,
          position: 'fixed',
          overflowY: 'auto',
        }
      }
    >
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 d-none d-sm-none d-md-block">Admin</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item: MenuItemsProp) => (
          <li key={item.id} className="nav-item">
            <Link to={item.link} className="nav-link text-white d-flex">
              <i className={`bi bi-${item.icon} mx-2`} />
              <span className="d-none d-sm-none d-md-block">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AsideMenuAdmin;
