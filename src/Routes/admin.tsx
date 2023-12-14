import { Routes, Route } from 'react-router-dom';
import User from '../Pages/Admin/Home/Users';
import News from '../Pages/Admin/Home/News';
import NotFound from '../Pages/Error/404';
import Options from '../Pages/Admin/Home/Options';

function RoutesAdmin() {
  return (
    <section style={{ marginLeft: '15vw' }}>
      <Routes>
        <Route path="news" element={<News />} />
        <Route path="users" element={<User />} />
        <Route path="options" element={<Options />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

    </section>

  );
}

export default RoutesAdmin;
