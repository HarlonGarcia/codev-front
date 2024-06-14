import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RequireAuth from '@auth-kit/react-router/RequireAuth';

import CmdDialog from './components/CmdDialog';
import Navbar from './components/Navbar';
import RequireAdmin from './pages/Auth/RequireAdmin';
import PageNotFound from './pages/PageNotFound';
import { AppDispatch } from './store';
import { closeModal, openModal } from './store/slices/commander';
import { useSelector } from './store/useSelector';
import { extraShortcuts, goToShortcuts } from './utils';

const Home = lazy(() => import('./pages/Home'));
const MyAccount = lazy(() => import('./pages/MyAccount'));
const SignIn = lazy(() => import('./pages/Auth/SignIn'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const Challenges = lazy(() => import('./pages/Challenges'));
const ChallengeInformation =
  lazy(() => import('./pages/Challenges/ChallengeInformation'));
const CreateChallenge =
  lazy(() => import('./pages/Challenges/CreateChallenge'));

const props = {
  fallbackPath: '/signin'
};

export default function AppRoutes() {
  const dispatch = useDispatch<AppDispatch>();
  const { isModalOpened } = useSelector((state) => state.commander);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSpecialKey = event.metaKey || event.ctrlKey;
      const keyPressed = event.key?.toUpperCase();

      if (isSpecialKey && keyPressed === 'K') {
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
            path='/account'
            element={
              <RequireAuth {...props}>
                <MyAccount />
              </RequireAuth>
            }
          />
          <Route path='challenges'>
            <Route
              index
              element={
                <RequireAuth {...props}>
                  <Challenges />
                </RequireAuth>
              }
            />
            <Route
              path=':id'
              element={
                <RequireAuth {...props}>
                  <ChallengeInformation />
                </RequireAuth>
              }
            />
          </Route>
          <Route path='*' element={<PageNotFound />} />

          <Route element={<RequireAdmin />}>
            <Route
              path='/challenges/create'
              element={
                <RequireAuth {...props}>
                  <CreateChallenge />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}