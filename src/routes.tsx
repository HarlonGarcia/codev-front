import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RequireAuth from '@auth-kit/react-router/RequireAuth';
import { jwtDecode as decode, JwtPayload } from 'jwt-decode';

import CmdDialog from './components/CmdDialog';
import Navbar from './components/Navbar';
import PageNotFound from './pages/PageNotFound';
import { closeModal, openModal } from './store/features/commanderSlice';
import { useSelector } from './store/useSelector';
import { extraShortcuts, goToShortcuts } from './utils';
import { ADMIN, USER } from './utils/constants';

const Home = React.lazy(() => import('./pages/Home'));
const MyAccount = React.lazy(() => import('./pages/MyAccount'));
const SignIn = React.lazy(() => import('./pages/Auth/SignIn'));
const SignUp = React.lazy(() => import('./pages/Auth/SignUp'));
const Challenges = React.lazy(() => import('./pages/Challenges'));
const ChallengeDetails = React.lazy(
  () => import('./pages/Challenges/ChallengeDetails'),
);
const CreateChallenge = React.lazy(
  () => import('./pages/Challenges/CreateChallenge'),
);

interface JwtPayloadWithGroups extends JwtPayload {
  groups: string[];
}

const MIN_TOKEN_LENGHT = 10;
const fallbackPath = '/signin';

export default function AppRoutes() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isModalOpened } = useSelector((state) => state.commander);

  if (token && MIN_TOKEN_LENGHT < token.length) {
    const { sub: email, groups }: JwtPayloadWithGroups = decode(token);
    const isAdmin = groups.find((group) => group.toLocaleLowerCase() === ADMIN);

    localStorage.setItem('_email', email as string);
    localStorage.setItem('_role', isAdmin ? ADMIN : USER);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSpecialKey = event.metaKey || event.ctrlKey;
      const keyPressed = event.key?.toUpperCase();

      if (isSpecialKey && keyPressed === 'K') {
        event.preventDefault();
        dispatch(openModal());
      }

      if (isSpecialKey && goToShortcuts[keyPressed]) {
        event.preventDefault();
        goToShortcuts[keyPressed].action();
        dispatch(closeModal());
      }

      if (isSpecialKey && extraShortcuts[keyPressed]) {
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
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/challenges'
            element={
              <RequireAuth fallbackPath={fallbackPath}>
                <Challenges />
              </RequireAuth>
            }
          />
          <Route
            path='/challenges/:id'
            element={
              <RequireAuth fallbackPath={fallbackPath}>
                <ChallengeDetails />
              </RequireAuth>
            }
          />
          <Route
            path='/challenges/create'
            element={
              <RequireAuth fallbackPath={fallbackPath}>
                <CreateChallenge />
              </RequireAuth>
            }
          />
          <Route
            path='/account'
            element={
              <RequireAuth fallbackPath={fallbackPath}>
                <MyAccount />
              </RequireAuth>
            }
          />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
