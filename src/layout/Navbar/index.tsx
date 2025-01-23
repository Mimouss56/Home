import { useEffect } from 'react';
import NavBar from './Menu';
import { MenuProp } from '../../@types/menu';
import ConnexionBtn from './connexionNav';
import AsideMenu from './AsideMenu';
import useMeStore from '../../store/me.store';

export default function Navbar({ navContent }: {
  navContent: MenuProp[];
}) {
  const { me: user, fetch } = useMeStore((state) => state);
  useEffect(() => {
    
    // fetch()
    if (user?.role.id === 1) {
      const pushTestLink = {
        id: 4,
        name: 'Test',
        link: '/test',
      };
      // on verifie si le lien n'existe pas deja
      const found = navContent.some((el) => el.id === pushTestLink.id);
      if (!found) navContent.push(pushTestLink);
    }
  }, [user, navContent]);

  useEffect(() => {
    !user && sessionStorage.getItem('sessionToken') && fetch();
  }, [user, fetch]);

  return (
    <nav
      id="nav-bar"
      className="d-flex flex-wrap align-items-center justify-content-between p-2 vw-100 border-top border-bottom bg-dark position-sticky top-0 z-3"
      style={{
        backgroundColor: '#1d1d20',
        // height: '60px',
      }}
    >
      <NavBar navContentArray={navContent} />
      {user ? <AsideMenu /> : <ConnexionBtn />}
    </nav>

  );
}
