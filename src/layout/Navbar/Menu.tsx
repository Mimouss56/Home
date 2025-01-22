import { NavLink } from 'react-router-dom';
import { NavItem } from '../../@types/Home/nav/nav';

export default function NavBar({ navContentArray }: { navContentArray: NavItem[] }) {
  return (
    <ul className="nav col-lg-auto me-lg-auto mb-2 mb-md-0 flex-grow-1">
      <li>
        <NavLink to="/" className="nav-link px-2 link-light fw-bold">
          Accueil
        </NavLink>
      </li>

      {
        navContentArray.map((item: NavItem) => (
          <li key={item.id}>
            <NavLink to={item.link} className="nav-link px-2 link-light fw-bold">
              {item.name}
            </NavLink>
          </li>
        ))
      }
    </ul>
  );
}
