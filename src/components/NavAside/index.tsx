import Menu from '../../layout/User/aside.user';
// Nav Items
import navItemsMouss from '../../../data/navItemsMouss.json';
import navItemsUser from '../../../data/navItemsUser.json';
import { User as UserInfo } from '../../@types/Home/user';

function NavAside() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;
  return (
    userSession && (<Menu navContent={[navItemsUser, navItemsMouss]} />)
  );
}

export default NavAside;
