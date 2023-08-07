<<<<<<< HEAD
import { Menu } from 'react-feather';
import { Link } from 'react-router-dom';
import NavBar from './Menu';
import { MenuProp } from '../../@types/menu';
import './style.scss';
import { User } from '../../@types/user';

interface NavbarProp {
  navContent: MenuProp[];
}

function Navbar({ navContent }: NavbarProp) {
  const sessionToken = sessionStorage.getItem('sessionToken') as string;
  const userInfo = JSON.parse(sessionStorage.getItem('user') as string) as User;

  return (
    <header>
      <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start bg-dark p-2 fixed-top">
        <NavBar navContentArray={navContent} />
        {
          (sessionToken !== null && userInfo !== null)
            ? (
              <>
                <p className="text-light align-items-center m-2">
                  {`Bienvenu ${userInfo.username}`}
                </p>
                <Link to="/user/setting" className="d-block link-body-emphasis text-decoration-none m-2">
                  <img src="https://pluspng.com/img-png/github-octocat-logo-vector-png--896.jpg" alt="mdo" className="rounded-circle" width="32" height="32" />
                </Link>
                <button
                  type="button"
                  className="btn btn-light"
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
                className="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#modalLogin"
                data-bs-dismiss="modal"
              >
                Login
              </button>

            )
        }

=======
import Menu from './Menu';
import './style.scss';

const navContent = [
  {
    id: 1,
    name: 'Accueil',
    link: '/',
  },
  {
    id: 2,
    name: 'Cv',
    link: '/Cv',
  },
];

function Navbar() {
  return (
    <header>
      <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start bg-dark p-2 fixed-top">
        <Menu navContentArray={navContent} />
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
      </nav>

    </header>
  );
}

export default Navbar;
