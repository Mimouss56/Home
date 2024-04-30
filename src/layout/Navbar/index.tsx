import { Menu } from 'react-feather';
import NavBar from './Menu';
import { MenuProp } from '../../@types/menu';
import { baseUrl } from '../../../config.json';
import Login from '../../components/Modal/Auth/login';
import Register from '../../components/Modal/Auth/register';
import AsideUserMenu from '../User/aside.user';
import navItemsUser from '../../../data/navItemsUser.json';
import navItemsMouss from '../../../data/navItemsMouss.json';
import useUserStore from '../../store/user.store';

interface NavbarProp {
  navContent: MenuProp[];
}

function Navbar({ navContent }: NavbarProp) {
  const sessionToken = sessionStorage.getItem('sessionToken');
  const user = useUserStore((state) => state.user);
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
  // if (user.avatar) {
  //   setAvatar();
  // }
  // console.log('store.user', store.user);

  return (
    <>
      <nav
        id="nav-bar"
        className="d-flex flex-wrap align-items-center justify-content-between p-2 vw-100 border-top border-bottom bg-dark position-sticky z-3 top-0"
        style={{
          backgroundColor: '#1d1d20',
          // height: '60px',
        }}
      >
        <NavBar navContentArray={navContent} />
        {
          (sessionToken !== null)
            ? (
              <>
                <AsideUserMenu navContent={[navItemsUser, navItemsMouss]} />

                <p className="text-light m-2 d-none d-md-block">
                  {`Bienvenu ${user?.username}`}
                </p>
                <button
                  type="button"
                  // href="/user/setting"
                  className="btn d-block link-body-emphasis text-decoration-none m-2 d-none d-md-block"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#aside"
                >
                  <img
                    src={`${baseUrl}/images/${user?.avatar.path}`}
                    alt="avatar"
                    className="rounded-circle"
                    width="32"
                    height="32"
                  />
                </button>
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
                className="btn btn-dark text-light fw-bold "
                data-bs-toggle="modal"
                data-bs-target="#modalLogin"
                data-bs-dismiss="modal"
                data-bs-backdrop="static"
              >
                Connexion
              </button>

            )
        }

      </nav>
      {!sessionToken && (
        <>
          <Login />
          <Register />
        </>
      )}
    </>

  );
}

export default Navbar;
