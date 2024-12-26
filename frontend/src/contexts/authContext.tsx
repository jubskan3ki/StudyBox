import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '~/store';
import { login, logout } from '~/store/slices/auth.slice';

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    role: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    token: null,
    role: null,
    login: () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const dispatch = useDispatch();
    const { isAuthenticated: isLoggedIn, token, role } = useSelector((state: RootState) => state.auth);

    const handleLogin = (token: string, role: string) => {
        dispatch(login({ token, isAuthenticated: true, role }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                token,
                role,
                login: handleLogin,
                logout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth, AuthContext };
