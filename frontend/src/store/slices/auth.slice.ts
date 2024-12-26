import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    role: string | null;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ token: string; isAuthenticated: boolean; role: string }>) {
            state.token = action.payload.token;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.role = action.payload.role;
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.role = null;
        },
        setRole(state, action: PayloadAction<string>) {
            state.role = action.payload;
        },
    },
});

export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
