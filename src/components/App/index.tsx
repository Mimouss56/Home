import { Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import { User as UserInfo } from '../../@types/user';
import Under from '../UnderContruct';
=======

import Main from '../Main';
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
import Cv from '../Cv';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Login from '../Login';
import Register from '../Register';
<<<<<<< HEAD
import NotFound from '../notFound';
import './style.scss';
// User Import
import Menu from '../User/AsideMenu';
import User from '../User';
import Job from '../User/Job';
import Setting from '../User/Setting';
// Admin Import
import Admin from '../Admin';

const navContent = [
  {
    id: 1,
    name: 'Cv',
    link: '/Cv',
  },
];

function App() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as UserInfo;
  return (
    <>
      {userSession && <Menu />}
      <Navbar navContent={navContent} />
      <main className="d-flex flex-row">
        <Login />
        <Register />
        <Routes>
          {/* <Route path="/" element={<Main />} /> */}
          <Route path="/">
            <Route index element={<Under />} />
            <Route path="cv" element={<Cv />} />
            <Route path="about" element={<Cv />} />
            {userSession && (
              <>
                <Route path="user/">
                  <Route index element={<User />} />
                  <Route path="jobs" element={<Job />} />
                  <Route path="setting" element={<Setting />} />
                </Route>
                {userSession.role.label === 'admin' && (
                  <Route path="admin/">
                    <Route index element={<Admin />} />
                  </Route>
                )}
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
=======
import './style.scss';

function App() {
  return (

    <>
      <Navbar />
      <main className="bg-white d-flex flex-row">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Cv" element={<Cv />} />
          <Route path="/about" element={<Cv />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
      </main>
      <Footer />
    </>
  );
}

export default App;
