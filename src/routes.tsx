import { lazy, Suspense, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

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
const Participants = lazy(() => import('./pages/Challenges/Participants'));
const ChallengeInformation = lazy(() => import('./pages/Challenges/ChallengeInformation'));
const CreateChallenge = lazy(() => import('./pages/Dashboard/CreateChallenge'));
const MyChallenges = lazy(() => import('./pages/MyAccount/partials/MyChallenges'));
const ModifyUser = lazy(() => import('./pages/MyAccount/partials/ModifyUser'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Stats = lazy(() => import('./pages/Dashboard/partials/Stats'));
const DashboardChallenges = lazy(() => import('./pages/Dashboard/partials/Challenges'));

export default function AppRoutes() {
    const { isShortcutDialogVisible, setIsShortcutDialogVisible } = useContext(GlobalContext);

    useEffect(function handleKeyDownActions() {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isSpecialKey = event.metaKey || event.ctrlKey;
            const key = event.key?.toUpperCase();

            const shortcuts = { ...goToShortcuts, ...extraShortcuts };

            if (isSpecialKey && key === 'K') {
                event.preventDefault();
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
        <>
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
                                <AuthOnly>
                                    <MyAccount />
                                </AuthOnly>
                            }
                        />
                        <Route
                            path='challenges'
                            element={
                                <AuthOnly>
                                    <MyChallenges />
                                </AuthOnly>
                            }
                        />
                        <Route
                            path='edit'
                            element={
                                <AuthOnly>
                                    <ModifyUser />
                                </AuthOnly>
                            }
                        />
                    </Route>
                    <Route path='challenges'>
                        <Route
                            index
                            element={
                                <AuthOnly>
                                    <Challenges />
                                </AuthOnly>
                            }
                        />
                        <Route
                            path=':id'
                            element={
                                <AuthOnly>
                                    <ChallengeInformation />
                                </AuthOnly>
                            }
                        />
                        <Route
                            path=':id/users'
                            element={
                                <AuthOnly>
                                    <Participants />
                                </AuthOnly>
                            }
                        />
                    </Route>
                    <Route path='/dashboard' element={<Dashboard />}>
                        <Route
                            index
                            element={
                                <AdminOnly>
                                    <Stats />
                                </AdminOnly>
                            }
                        />
                        <Route
                            path='challenges'
                            element={
                                <AdminOnly>
                                    <DashboardChallenges />
                                </AdminOnly>
                            }
                        />
                        <Route
                            path='challenges/new-challenge'
                            element={
                                <AdminOnly>
                                    <CreateChallenge />
                                </AdminOnly>
                            }
                        />
                    </Route>
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </>
    );
}