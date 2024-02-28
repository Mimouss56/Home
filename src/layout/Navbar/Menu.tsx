/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, Outlet } from 'react-router-dom';
import { IUser } from '../../@types/Home/user';

interface NavItem {
  id: number;
  name: string;
  link: string;
}
const userInfo = JSON.parse(sessionStorage.getItem('user') || '{}') as IUser;

interface MenuProps {
  navContentArray: NavItem[];
}

function NavBar({ navContentArray }: MenuProps) {
  return (
    <ul className="nav col-lg-auto me-lg-auto mb-2 mb-md-0 flex-grow-1">
      <li>
        <Link to="/" className="nav-link px-2 link-light fw-bold">
          Accueil
        </Link>
      </li>

      {
        navContentArray.map((item: NavItem) => {
          const isActive = window.location.pathname.toLowerCase() === item.link.toLowerCase();
          const textActive = isActive ? 'text-secondary' : 'text-white';
          return (
            <li key={item.id}>
              <Link to={item.link} className={`nav-link px-2 link-light fw-bold ${textActive}`}>
                {item.name}
              </Link>
            </li>
          );
        })
      }
      {
        userInfo?.role?.id === 1 && (
          <li>
            <Link
              to="/test"
              className={`
              nav-link px-2 fw-bold
              ${window.location.pathname.toLowerCase() === '/test' ? 'text-secondary' : 'text-white'}
              `}
            >
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
