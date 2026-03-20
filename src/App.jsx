import { useDispatch } from 'react-redux';
import { refresh } from './redux/auth/operations.js';
// import { store } from './redux/store.js';
import { useAuth } from './hooks/useAuth.js';
import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import { selectError, selectLoading } from './redux/selectors.js';
import Loader from './components/Loader/Loader.jsx';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import Error from './components/Error/Error.jsx';

import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const PrivatPage = lazy(() => import('./pages/PrivatPage/PrivatPage.jsx'));
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage.jsx'));
const RecipePage = lazy(() => import('./components/RecipePage/RecipePage.jsx'));

export default function App() {
    const dispatch = useDispatch();
    const { isRefreshing } = useAuth();

    useEffect(() => {
        dispatch(refresh());
    }, [dispatch]);

    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    return isRefreshing ? (
        <b>Refreshing user...</b>
    ) : (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* HomePage is public – visible to everyone */}
                    <Route path="/" element={<HomePage />} />

                    <Route path="/signup" element={<RestrictedRoute redirectTo="/" component={<SignUpPage />} />} />

                    <Route path="/signin" element={<RestrictedRoute redirectTo="/" component={<SignInPage />} />} />

                    <Route
                        path="/user/:id"
                        element={<PrivateRoute redirectTo="/signin" component={<PrivatPage />} />}
                    />

                    <Route path="/recipe/:id" element={<RecipePage />} />

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Suspense>
            <Toaster />
            {loading && <Loader />}
            {error && <Error />}
        </div>
    );
}
