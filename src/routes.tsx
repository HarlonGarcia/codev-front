import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Navbar from './components/Navbar';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/challenges' element={<Challenges />} />
      </Routes>
    </BrowserRouter>
  );
}
