import { Link } from 'react-router-dom';
import { MenuItemsProp } from '../../@types/menu';
import ProtectedRoute from '../../components/ProtectedRoute';

interface MenuProp {
  navItems: MenuItemsProp[];
}

function AsideMenuAdmin({ navItems }: MenuProp) {
  return (
    <ProtectedRoute>
      <div
        className="d-flex flex-column flex-shrink-0 p-l-3 p-md-1 text-bg-dark bg-dark vh-100 fixed-top"
        style={{ width: '15vw' }}
      >
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4 d-none d-md-block">Admin</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {navItems.map((item: MenuItemsProp) => (
            <li key={item.title} className="nav-item">
              <Link to={item.link} className="nav-link text-white d-flex align-items-center">
                <i className={`bi bi-${item.icon} mx-2`} />
                <span className="d-none d-md-block">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}

export default AsideMenuAdmin;
