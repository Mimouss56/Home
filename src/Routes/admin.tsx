import { Routes, Route } from 'react-router-dom';
import User from '../Pages/Admin/Home/Users';
import News from '../Pages/Admin/Home/News';
import Options from '../Pages/Admin/Home/Options';
import NotFound from '../Pages/Error/404';
import Sites from '../Pages/Admin/Home/Sites';
import ListFeedBack from '../Pages/Admin/Home/Feedback';

function RoutesAdmin() {
  return (
    <Routes>
      <Route path="news" element={<News />} />
      <Route path="users" element={<User />} />
      <Route path="options" element={<Options />} />
      <Route path="sites" element={<Sites />} />
      <Route path="feedback" element={<ListFeedBack />} />

      <Route path="*" element={<NotFound />} />

    </Routes>

  );
}

export default RoutesAdmin;
