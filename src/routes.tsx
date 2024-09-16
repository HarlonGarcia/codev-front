import { lazy, Suspense, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';
import ShortcutDialog from 'components/ShortcutDialog';
import { extraShortcuts, goToShortcuts } from 'components/ShortcutDialog/utils';
import { GlobalContext } from 'contexts/GlobalContext';
import { AdminOnly } from 'pages/Auth/AdminOnly';
import { AuthOnly } from 'pages/Auth/AuthOnly';
import PageNotFound from 'pages/PageNotFound';

const Home = lazy(() => import('./pages/Home'));
const MyAccount = lazy(() => import('./pages/MyAccount'));
const SignIn = lazy(() => import('./pages/Auth/SignIn'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const Challenges = lazy(() => import('./pages/Challenges'));
const ChallengeInformation = lazy(() => import('./pages/Challenges/ChallengeInformation'));
const CreateChallenge = lazy(() => import('./pages/Challenges/CreateChallenge'));

const props = {
  redirectUrl: '/signin'
};

export default function AppRoutes() {
  const { isShortcutDialogVisible, setIsShortcutDialogVisible } = useContext(GlobalContext);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSpecialKey = event.metaKey || event.ctrlKey;
      const key = event.key?.toUpperCase();
      const shortcuts = { ...goToShortcuts, ...extraShortcuts };

      if (isSpecialKey && key === 'K') {
        setIsShortcutDialogVisible(true);
      }

      if (!isSpecialKey || !isShortcutDialogVisible) {
        return;
      }

      event.preventDefault();
      shortcuts[key]?.action();

      if (goToShortcuts[key]) {
        setIsShortcutDialogVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isShortcutDialogVisible]);

  return (
    <BrowserRouter>
      <ShortcutDialog />
      <Navbar />
      <Suspense>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/account'
            element={
              <AuthOnly {...props}>
                <MyAccount />
              </AuthOnly>
            }
          />
          <Route path='challenges'>
            <Route
              index
              element={
                <AuthOnly {...props}>
                  <Challenges />
                </AuthOnly>
              }
            />
            <Route
              path=':id'
              element={
                <AuthOnly {...props}>
                  <ChallengeInformation />
                </AuthOnly>
              }
            />
          </Route>
          <Route path='*' element={<PageNotFound />} />

          <Route element={<AdminOnly />}>
            <Route
              path='/challenges/create'
              element={
                <AuthOnly>
                  <CreateChallenge />
                </AuthOnly>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}