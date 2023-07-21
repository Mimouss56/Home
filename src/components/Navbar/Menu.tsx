import { Link, Outlet } from 'react-router-dom';

interface NavItem {
  id: number;
  name: string;
  link: string;
}

interface MenuProps {
  navContentArray: NavItem[];
}

function NavBar({ navContentArray }: MenuProps) {
  return (
    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li>
        <Link to="/" className="nav-link px-2 link-light">
          Accueil
        </Link>
      </li>

      {
        navContentArray.map((item: NavItem) => {
          const isActive = window.location.pathname === item.link;
          const textActive = isActive ? 'text-secondary' : 'text-white';
          return (
            <li key={item.id}>
              <Link to={item.link} className={`nav-link px-2 ${textActive}`}>
                {item.name}
              </Link>
            </li>
          );
        })
      }
      <Outlet />
    </ul>
  );
}

export default NavBar;
