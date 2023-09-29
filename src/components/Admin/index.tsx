import { Routes, Route, Outlet } from 'react-router-dom';
import News from '../News';
import User from './Users';
import NotFound from '../notFound';
import AsideMenuAdmin from './AsideMenu';
import menuAdmin from '../../../data/navItemsAdmin.json';

function Admin() {
  return (
    <div className="d-flex ">
      <AsideMenuAdmin navItems={menuAdmin} />
      <main className="d-flex flex-row">

        <Routes>
          <Route path="news" element={<News />} />
          <Route path="users" element={<User />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
}

export default Admin;
