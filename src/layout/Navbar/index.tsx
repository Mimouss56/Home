import { useContext, useEffect } from 'react';
import NavBar from './Menu';
import { MenuProp } from '../../@types/menu';
import { userContext } from '../../store/user.context';
import ConnexionBtn from './connexionNav';
import AsideMenu from './AsideMenu';

export default function Navbar({ navContent }: {
  navContent: MenuProp[];
}) {
  const { user } = useContext(userContext);

  useEffect(() => {
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
