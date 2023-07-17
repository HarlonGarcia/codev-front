import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Navbar from './components/Navbar';
import CmdDialog from './components/CmdDialog';
import { useDispatch } from 'react-redux';
import { closeCommanderModal, openCommanderModal } from './store/features/commander-slice';
import { extraShortcuts, goToShortcuts } from './utils/shortcuts';

export default function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === 'K' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        dispatch(openCommanderModal());
      } else {  
        const keyPressed = event.key.toUpperCase();

        if (goToShortcuts[keyPressed]) {
          event.preventDefault();
          
          goToShortcuts[keyPressed].action();
          dispatch(closeCommanderModal());
        }

        if (extraShortcuts[keyPressed]) {
          event.preventDefault();
          extraShortcuts[keyPressed].action();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <CmdDialog />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/challenges' element={<Challenges />} />
      </Routes>
    </BrowserRouter>
  );
}
