import { Suspense, lazy, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from '~/contexts/authContext';

import Layout from './components/navigation/Layout';
import './styles/tailwind.css';
import './styles/index.css';

// Lazy loading des pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ProfilPage = lazy(() => import('./pages/ProfilPage'));
const OrganisationPage = lazy(() => import('./pages/OrganisationPage'));
const EventPage = lazy(() => import('./pages/Event/EventPage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const TargetOrganisationPage = lazy(() => import('./pages/TargetOrganisationPage'));

// Lazy loading des composants spécifiques
const EventFormComponent = lazy(() => import('~/components/ui/form/EventForm/EventFormComponent'));

// Composant pour les routes d'authentification
function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

// Composant pour les routes protégées
function ProtectedRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/profil" element={<ProfilPage />} />
                <Route path="/organisation" element={<OrganisationPage />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/events/createNewEvent" element={<EventFormComponent isUpdate={false} />} />
                <Route path="/organisation/:companyName" element={<TargetOrganisationPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

// Composant central de gestion des routes
function AppContent() {
    const { isLoggedIn } = useContext(AuthContext);

    return <Suspense fallback={<div>Chargement...</div>}>{isLoggedIn ? <ProtectedRoutes /> : <AuthRoutes />}</Suspense>;
}

// Composant principal de l'application
function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
