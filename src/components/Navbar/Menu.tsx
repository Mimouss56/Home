interface NavItem {
  id: number;
  name: string;
  link: string;
}

interface MenuProps {
  navContentArray: NavItem[];
}

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
    </ul>
  );
}

export default Menu;
