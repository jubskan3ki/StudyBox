import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    pseudo: string | null;
    email: string | null;
    profileType: string | null;
    type: string | null;
    role: string | null;
    photoProfil: string | null;
}

const initialState: UserState = {
    id: null,
    firstName: null,
    lastName: null,
    pseudo: null,
    email: null,
    profileType: null,
    type: null,
    role: null,
    photoProfil: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action: { payload: UserState }) {
            state.id = action.payload.id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.pseudo = action.payload.pseudo;
            state.email = action.payload.email;
            state.profileType = action.payload.profileType;
            state.type = action.payload.type;
            state.role = action.payload.role;
        },
        clearUserInfo(state) {
            state.id = null;
            state.firstName = null;
            state.lastName = null;
            state.pseudo = null;
            state.email = null;
            state.profileType = null;
            state.type = null;
            state.role = null;
        },
        setPhotoProfil(state, action: { payload: string }) {
            state.photoProfil = action.payload;
        },
    },
});

export const { setUserInfo, clearUserInfo, setPhotoProfil } = userSlice.actions;
export default userSlice.reducer;
