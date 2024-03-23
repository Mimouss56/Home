import { Menu } from 'react-feather';
import { useEffect, useState } from 'react';
import MenuNav from '../User/aside.user';
import NavBar from './Menu';
import { MenuProp } from '../../@types/menu';
import { IUser } from '../../@types/Home/user';
import navItemsMouss from '../../../data/navItemsMouss.json';
import navItemsUser from '../../../data/navItemsUser.json';
import { baseUrl } from '../../../config.json';

interface NavbarProp {
  navContent: MenuProp[];
}

function Navbar({ navContent }: NavbarProp) {
  const [avatar, setAvatar] = useState('');
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const updateUserInfo = () => {
    const storedUserInfo = sessionStorage.getItem('user');
    if (storedUserInfo) {
      const user = JSON.parse(storedUserInfo) as IUser;
      setUserInfo(user);
      setAvatar(user.avatar ? `${baseUrl}/images/${user.avatar.path}` : 'https://pluspng.com/img-png/github-octocat-logo-vector-png--896.jpg');
    } else {
      setUserInfo(null);
    }

    const storedSessionToken = sessionStorage.getItem('sessionToken');
    setSessionToken(storedSessionToken);
  };

  // Ajout du lien Test pour les admin
  if (userInfo?.role.id === 1) {
    const pushTestLink = {
      id: 4,
      name: 'Test',
      link: '/test',
    };
    // on verifie si le lien n'existe pas deja
    const found = navContent.some((el) => el.id === pushTestLink.id);
    if (!found) navContent.push(pushTestLink);
  }

  useEffect(() => {
    updateUserInfo();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'sessionToken') {
        updateUserInfo();
      }
    };
    // si le menu est en haut de la page on ajoute la class fixed-top
    const nav = document.querySelector('nav');
    const sticky = nav?.offsetTop || null;
    const scrollCallBack = () => {
      if (sticky !== null && window.scrollY > sticky) {
        nav?.classList.add('fixed-top');
      } else {
        nav?.classList.remove('fixed-top');
      }
    };
    window.addEventListener('scroll', scrollCallBack);
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('newLogin', updateUserInfo);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('newLogin', updateUserInfo);
    };
  }, [navContent]);

  return (
    <>
      <header className={`${window.scrollY > 0 ? 'fixed-top' : ''}`}>
        <nav
          className="d-flex flex-wrap align-items-center justify-content-between p-2 vw-100 border-top"
          style={{
            backgroundColor: '#1d1d20',
          }}
        >
          <NavBar navContentArray={navContent} />
          {
            (sessionToken !== null && userInfo !== null)
              ? (
                <>
                  <p className="text-light m-2 d-none d-md-block">
                    {`Bienvenu ${userInfo.username}`}
                  </p>
                  <a
                    href="/user/setting"
                    className="d-block link-body-emphasis text-decoration-none m-2 d-none d-md-block"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#aside"
                  >
                    <img
                      src={avatar}
                      alt="avatar"
                      className="rounded-circle"
                      width="32"
                      height="32"
                    />
                  </a>
                  <button
                    type="button"
                    className="btn align-items-end text-light d-block d-md-none"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#aside"
                    aria-controls="offcanvasRight"
                  >
                    <Menu color="black" className="m-0" />
                  </button>
                </>
              )
              : (
                <button
                  type="button"
                  className="btn text-light fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#modalLogin"
                  data-bs-dismiss="modal"
                >
                  Connexion
                </button>

              )
          }

        </nav>

      </header>
      {userInfo && (<MenuNav navContent={[navItemsUser, navItemsMouss]} />)}
    </>
  );
}

export default Navbar;
