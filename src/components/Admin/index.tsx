import { Routes, Route } from 'react-router-dom';
import User from './Users';
import News from './News';
import Options from './Options';

function Admin() {
  return (
    <Routes>
      <Route path="news" element={<News />} />
      <Route path="users" element={<User />} />
      <Route path="options" element={<Options />} />
    </Routes>
  );
}

export default Admin;
