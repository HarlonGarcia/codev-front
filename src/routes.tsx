import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RequireAuth } from 'react-auth-kit';

import Navbar from './components/Navbar';
import CmdDialog from './components/CmdDialog';
import { closeCommanderModal, openCommanderModal } from './store/features/commanderSlice';
import { extraShortcuts, goToShortcuts } from './utils/userOptions/shortcuts';
import { useCustomSelector } from './store/useCustomSelector';

const Challenges = React.lazy(() => import('./pages/Challenges'));
const ChallengeDetails = React.lazy(() => import('./pages/Challenges/ChallengeDetails'));
const CreateChallenge = React.lazy(() => import('./pages/Challenges/CreateChallenge'));
const Home = React.lazy(() => import('./pages/Home'));
const MyAccount = React.lazy(() => import('./pages/MyAccount'));
const SignIn = React.lazy(() => import('./pages/Auth/SignIn'));
const Users = React.lazy(() => import('./pages/Users'));

const redirectPath = '/signIn';

export default function AppRoutes() {
  const dispatch = useDispatch();
  const { isModalOpened } = useCustomSelector((state) => state.commander);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSpecialKeyDown = (event.metaKey || event.ctrlKey);
      const keyPressed = event.key?.toUpperCase();
      
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
          <Route path='/signin' element={<SignIn />} />
          <Route
            path='/challenges'
            element={
              <RequireAuth loginPath={redirectPath}>
                <Challenges />
              </RequireAuth>
            }
          />
          <Route
            path='/challenges/:id'
            element={
              <RequireAuth loginPath={redirectPath}>
                <ChallengeDetails />
              </RequireAuth>
            }
          />
          <Route
            path='/challenges/create'
            element={
              <RequireAuth loginPath={redirectPath}>
                <CreateChallenge />
              </RequireAuth>
            }
          />
          <Route
            path='/my_account'
            element={
              <RequireAuth loginPath={redirectPath}>
                <MyAccount />
              </RequireAuth>
            }
          />
          <Route
            path='/users'
            element={
              <RequireAuth loginPath={redirectPath}>
                <Users />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}