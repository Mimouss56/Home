/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu } from 'react-feather';
import { Link } from 'react-router-dom';
import NavBar from './Menu';
import { MenuProp } from '../../@types/menu';
import { User } from '../../@types/Home/user';

interface NavbarProp {
  navContent: MenuProp[];
}

function Navbar({ navContent }: NavbarProp) {
  const sessionToken = sessionStorage.getItem('sessionToken') as string;
  const userInfo = JSON.parse(sessionStorage.getItem('user') as string) as User;
  const avatar = `https://www.mimouss.fr/images/${userInfo?.avatar.path}` || 'https://pluspng.com/img-png/github-octocat-logo-vector-png--896.jpg';

  return (
    <header>
      <nav
        className="d-flex flex-wrap align-items-center justify-content-between p-2 fixed-top vw-100"
        style={{
          backgroundColor: '#da5903',
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
                <Link
                  to="/user/setting"
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
                </Link>
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
  );
}

export default Navbar;
