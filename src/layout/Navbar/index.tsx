import { useEffect, useMemo } from 'react';
import NavBar from './Menu';
import { MenuProp } from '../../@types/menu';
import ConnexionBtn from './connexionNav';
import AsideMenu from './AsideMenu';
import useMeStore from '../../store/me.store';
import navItemsMouss from '../../../data/navItemsMouss.json';
import navTop from '../../../data/navTop.json';

export default function Navbar() {
  const { me: user, fetch } = useMeStore((state) => state);

  // Fetch user data if session token exists
  useEffect(() => {
    const hasSessionToken = sessionStorage.getItem('sessionToken');
    if (!user && hasSessionToken) {
      fetch();
    }
  }, [user, fetch]);

  // Calculate navigation items based on user role
  const navContent = useMemo(() => {
    let navigationItems = [...navTop];

    if (user?.role.label === 'admin') {
      navigationItems = [...navigationItems, ...navItemsMouss];
    }

    if (user?.role.label === 'admin' || user?.child) {
      navigationItems.push({
        id: 2,
        name: 'Sanction',
        link: '/sanction',
      });
    }

    if (user?.role.id === 1) {
      const testLink = {
        id: 4,
        name: 'Test',
        link: '/test',
      };
      if (!navigationItems.some((item) => item.id === testLink.id)) {
        navigationItems.push(testLink);
      }
    }

    return navigationItems;
  }, [user]);

  return (
    <nav
      id="nav-bar"
      className="d-flex flex-wrap align-items-center justify-content-between p-2 vw-100 border-top border-bottom bg-dark position-sticky top-0 z-3"
      style={{ backgroundColor: '#1d1d20' }}
    >
      <NavBar navContentArray={navContent} />
      {user ? <AsideMenu /> : <ConnexionBtn />}
    </nav>
  );
}
