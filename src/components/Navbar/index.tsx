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
      </nav>

    </header>
  );
}

export default Navbar;
