// src/services/PrivateRoute.tsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '~/store';

type PrivateRouteProps = {
    children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children; // Renvoie les enfants si l'utilisateur est authentifié
};

export default PrivateRoute;
