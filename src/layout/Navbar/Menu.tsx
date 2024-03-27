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
    <ul className="nav col-lg-auto me-lg-auto mb-2 mb-md-0 flex-grow-1">
      <li>
        <a href="/" className="nav-link px-2 link-light fw-bold">
          Accueil
        </a>
      </li>

      {
        navContentArray.map((item: NavItem) => {
          const isActive = window.location.pathname.toLowerCase() === item.link.toLowerCase();
          const textActive = isActive ? 'text-white' : 'text-secondary';
          return (
            <li key={item.id}>
              <a href={item.link} className={`nav-link px-2 link-light fw-bold ${textActive}`}>
                {item.name}
              </a>
            </li>
          );
        })
      }
    </ul>
  );
}

export default NavBar;
