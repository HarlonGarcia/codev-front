import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Navbar from './components/Navbar';
import CmdDialog from './components/CmdDialog';

export default function AppRoutes() {
  const [ isDialogOpened, setIsDialogOpened ] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsDialogOpened((prevState) => !prevState);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter>
      <CmdDialog open={isDialogOpened} setOpen={setIsDialogOpened} />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/challenges' element={<Challenges />} />
      </Routes>
    </BrowserRouter>
  );
}
