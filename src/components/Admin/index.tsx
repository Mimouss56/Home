import { Routes, Route } from 'react-router-dom';
import User from './Users';
import News from './News';

function Admin() {
  return (
    <Routes>
      <Route path="news" element={<News />} />
      <Route path="users" element={<User />} />
    </Routes>
  );
}

export default Admin;
