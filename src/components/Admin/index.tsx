import { Routes, Route, Outlet } from 'react-router-dom';
import News from '../News';
import User from './Users';
import NotFound from '../notFound';

function Admin() {
  return (
    <div className="d-flex ">

      <Routes>
        <Route path="news" element={<News />} />
        <Route path="users" element={<User />} />
      </Routes>
    </div>
  );
}

export default Admin;
