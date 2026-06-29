import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
    id: number;
    username: string;
    nickname: string;
}

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: UserInfo | null;
    roles: string[];
    permissions: string[];
}

const getLocalStorageItem = (key: string): string | null => {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
};

const getParsedLocalStorageItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        return null;
    }
};

const initialState: AuthState = {
    accessToken: getLocalStorageItem('accessToken'),
    refreshToken: getLocalStorageItem('refreshToken'),
    user: getParsedLocalStorageItem<UserInfo>('user'),
    roles: getParsedLocalStorageItem<string[]>('roles') || [],
    permissions: getParsedLocalStorageItem<string[]>('permissions') || [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginInfo: (state, action: PayloadAction<{
            accessToken: string;
            refreshToken: string;
            user: UserInfo;
            roles: string[];
            permissions: string[];
        }>) => {
            const { accessToken, refreshToken, user, roles, permissions } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.user = user;
            state.roles = roles;
            state.permissions = permissions;

            // Save to localStorage for persistence
            try {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('roles', JSON.stringify(roles));
                localStorage.setItem('permissions', JSON.stringify(permissions));
            } catch (e) {
                console.error('Failed to write authentication to localStorage', e);
            }
        },
        clearAuth: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
            state.roles = [];
            state.permissions = [];

            // Remove from localStorage
            try {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                localStorage.removeItem('roles');
                localStorage.removeItem('permissions');
            } catch (e) {
                console.error('Failed to remove authentication from localStorage', e);
            }
        },
    },
});

export const { setLoginInfo, clearAuth } = authSlice.actions;

export const selectAuth = (state: any) => state.auth;
export const selectPermissions = (state: any) => state.auth.permissions;
export const selectRoles = (state: any) => state.auth.roles;
export const selectUser = (state: any) => state.auth.user;

export default authSlice.reducer;
