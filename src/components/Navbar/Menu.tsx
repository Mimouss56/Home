import { Link, Outlet } from 'react-router-dom';
import { User } from '../../@types/user';

interface NavItem {
  id: number;
  name: string;
  link: string;
}
const userInfo = JSON.parse(sessionStorage.getItem('user') || '{}') as User;

interface MenuProps {
  navContentArray: NavItem[];
}

function NavBar({ navContentArray }: MenuProps) {
  return (
    <ul className="nav col-lg-auto me-lg-auto mb-2 mb-md-0 flex-grow-1">
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
      {
        userInfo?.role?.id === 1 && (
          <li>
            <Link to="/test" className="nav-link px-2 link-light">
              Test
            </Link>
          </li>
        )
      }
      <Outlet />
    </ul>
  );
}

export default NavBar;
