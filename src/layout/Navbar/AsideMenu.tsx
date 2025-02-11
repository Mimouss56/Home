import { Menu } from 'react-feather';
import AsideUserMenu from '../User/aside.user';
import useMeStore from '../../store/me.store';

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function AsideMenu() {
  const { me: user } = useMeStore((state) => state);

  return (
    <>
      <AsideUserMenu />

      <p className="text-light p-2 d-none d-md-block mb-0">
        {`Bienvenu ${user?.username}`}
      </p>
      <button
        type="button"
        // href="/user/setting"
        className="btn d-block link-body-emphasis text-decoration-none px-2 d-none d-md-block"
        data-bs-toggle="offcanvas"
        data-bs-target="#aside"
      >
        <img
          src={
            user?.avatar
              ? `${baseUrl}/images/${user.avatar.path}`
              // image default github

              : 'https://avatars.githubusercontent.com/u/583231?v=1'
          }
          alt="avatar"
          className="rounded-circle"
          width="32"
          height="32"
        />
      </button>
      <button
        className="navbar-toggler text-light d-block d-md-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#aside"
        aria-controls="offcanvasRight"
        aria-label="Toggle navigation"
      >
        <Menu color="grey" className="m-0" />
      </button>

    </>
  );
}
