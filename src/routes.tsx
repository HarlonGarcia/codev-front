import { lazy, Suspense, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';
import ShortcutDialog from 'components/ShortcutDialog';
import { extraShortcuts, goToShortcuts } from 'components/ShortcutDialog/utils';
import { GlobalContext } from 'contexts/GlobalContext';
import { AuthOnly } from 'pages/Auth/AuthOnly';
import PageNotFound from 'pages/PageNotFound';

const Home = lazy(() => import('./pages/Home'));
const MyAccount = lazy(() => import('./pages/MyAccount'));
const SignIn = lazy(() => import('./pages/Auth/SignIn'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const Challenges = lazy(() => import('./pages/Challenges'));
const Participants = lazy(() => import('./pages/Challenges/Participants'));
const ChallengeInformation = lazy(() => import('./pages/Challenges/ChallengeInformation'));
const CreateChallenge = lazy(() => import('./pages/Challenges/CreateChallenge'));
const MyChallenges = lazy(() => import('./pages/MyAccount/partials/MyChallenges'));

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
          <Route path='account'>
            <Route
              index
              element={
                <AuthOnly {...props}>
                  <MyAccount />
                </AuthOnly>
              }
            />
            <Route
              path='challenges'
              element={
                <AuthOnly {...props}>
                  <MyChallenges />
                </AuthOnly>
              }
            />
          </Route>
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
            <Route
              path=':id/users'
              element={
                <AuthOnly {...props}>
                  <Participants />
                </AuthOnly>
              }
            />
          </Route>
          <Route
            path='new'
            element={
              <AuthOnly {...props}>
                <CreateChallenge />
              </AuthOnly>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}