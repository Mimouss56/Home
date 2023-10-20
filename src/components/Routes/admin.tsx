import { Routes, Route } from 'react-router-dom';
import User from '../Admin/Home/Users';
import News from '../Admin/Home/News';
import Options from '../Admin/Home/Options';
import NotFound from '../notFound';

function RoutesAdmin() {
  return (
    <Routes>
      <Route path="news" element={<News />} />
      <Route path="users" element={<User />} />
      <Route path="options" element={<Options />} />
      <Route path="*" element={<NotFound />} />

    </Routes>

  );
}

export default RoutesAdmin;
