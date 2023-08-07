<<<<<<< HEAD
import { Link, Outlet } from 'react-router-dom';

=======
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
interface NavItem {
  id: number;
  name: string;
  link: string;
}

interface MenuProps {
  navContentArray: NavItem[];
}

<<<<<<< HEAD
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
=======
function Menu({ navContentArray }:MenuProps) {
  return (
    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      {
      navContentArray.map((item : NavItem) => {
        const isActive = window.location.pathname === item.link;
        const textActive = isActive ? 'text-secondary' : 'text-white';
        return (
          <li key={item.id}><a href={item.link} className={`nav-link px-2 ${textActive}`}>{item.name}</a></li>
        );
      })
    }
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
    </ul>
  );
}

<<<<<<< HEAD
export default NavBar;
=======
export default Menu;
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
