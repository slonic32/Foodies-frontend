import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../Loader/Loader';

export default function RestrictedRoute({ component: Component, redirectTo = '/' }) {
    const { isLoggedIn, isRefreshing } = useAuth();

    if (isRefreshing) return <Loader />;

    return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}
