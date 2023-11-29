import { Route, Routes } from 'react-router-dom';

import Main from '../Main';
import Cv from '../Cv';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Login from '../Login';
import Register from '../Register';
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

      </main>
      <Footer />
    </>
  );
}

export default App;
