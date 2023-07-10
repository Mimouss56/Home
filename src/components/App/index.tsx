import { Route, Routes } from 'react-router-dom';

import Main from '../Main';
import Cv from '../Cv';
import Footer from '../Footer';
import Navbar from '../Navbar';

function App() {
  return (
    <div className="bg-secondary">
      <Navbar />
      <main className="bg-white mt-2" style={{ paddingBottom: '50px', paddingTop: '50px', overflowY: 'auto' }}>
        <div className="container">
          <div className="row">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/Cv" element={<Cv />} />
              <Route path="/about" element={<Cv />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
