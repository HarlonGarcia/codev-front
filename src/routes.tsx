import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navbar from './components/Navbar';
import CmdDialog from './components/CmdDialog';
import { closeCommanderModal, openCommanderModal } from './store/features/commanderSlice';
import { extraShortcuts, goToShortcuts } from './utils/userOptions/shortcuts';
import { useCustomSelector } from './store/useCustomSelector';

const Home = React.lazy(() => import('./pages/Home'));
const Challenges = React.lazy(() => import('./pages/Challenges'));
const ChallengeDetails = React.lazy(() => import('./pages/Challenges/ChallengeDetails'));
const CreateChallenge = React.lazy(() => import('./pages/Challenges/CreateChallenge'));
const MyAccount = React.lazy(() => import('./pages/MyAccount'));
const Users = React.lazy(() => import('./pages/Users'));

export default function AppRoutes() {
  const dispatch = useDispatch();
  const { isModalOpened } = useCustomSelector((state) => state.commander);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSpecialKeyDown = (event.metaKey || event.ctrlKey);
      const keyPressed = event.key.toUpperCase();
      
      if (isSpecialKeyDown && keyPressed === 'K') {
        event.preventDefault();
        dispatch(openCommanderModal());
      }   

      if (isSpecialKeyDown && goToShortcuts[keyPressed]) {
        event.preventDefault();
        
        goToShortcuts[keyPressed].action();
        dispatch(closeCommanderModal());
      }

      if (isSpecialKeyDown && extraShortcuts[keyPressed]) {
        event.preventDefault();
        extraShortcuts[keyPressed].action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ dispatch, isModalOpened ]);

  return (
    <BrowserRouter>
      <CmdDialog />
      <Navbar />
      <Suspense>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/challenges' element={<Challenges />} />
          <Route path='/challenges/:id' element={<ChallengeDetails />} />
          <Route path='/challenges/create' element={<CreateChallenge />} />
          <Route path='/my_account' element={<MyAccount />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
