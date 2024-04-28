import AsideMenuAdmin from './aside.menu';
import navItemsAdmin from '../../../data/navItemsAdmin.json';
import { IUser } from '../../@types/Home/user';
import RoutesAdmin from '../../Routes/admin';

function PageAdminHome() {
  const userInfo = JSON.parse(sessionStorage.getItem('user') as string) as IUser;

  return (
    <div className="row">
      {userInfo.role.id === 1 && (<AsideMenuAdmin navItems={navItemsAdmin} />)}

      <section
        className="offset-col-2 col-10 active vh-100 px-5 py-2"
      >
        <RoutesAdmin />
      </section>
    </div>
  );
}

export default PageAdminHome;