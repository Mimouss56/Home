import { Routes, Route, Outlet } from 'react-router-dom';
import News from '../News';
import NotFound from '../notFound';

function Admin() {
  return (
    <>
      <Routes>
        <Route path="news" element={<News />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>

  );
}

export default Admin;
