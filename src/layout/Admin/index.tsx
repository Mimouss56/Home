import AsideMenuAdmin from './aside.menu';
import navItemsAdmin from '../../../data/navItemsAdmin.json';
import RoutesAdmin from '../../Routes/admin';
import useMeStore from '../../store/me.store';

function PageAdminHome() {
  const { me: user } = useMeStore((state) => state);

  return (
    <div className="row">
      {user?.role.id === 1 && (<AsideMenuAdmin navItems={navItemsAdmin} />)}

      <section
        className="offset-col-2 col-10 active vh-100 px-5 py-2"
      >
        <RoutesAdmin />
      </section>
    </div>
  );
}

export default PageAdminHome;
