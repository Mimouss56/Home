import { Routes, Route } from 'react-router-dom';
import User from '../Admin/Home/Users';
import News from '../Admin/Home/News';
import Options from '../Admin/Home/Options';

function RoutesAdmin() {
  return (
    <Routes>
      <Route path="news" element={<News />} />
      <Route path="users" element={<User />} />
      <Route path="options" element={<Options />} />
    </Routes>

  );
}

export default RoutesAdmin;
