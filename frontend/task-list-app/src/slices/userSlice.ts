import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import userService from '../services/userService';
import { User } from '../interfaces/User';

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        getUserSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.user = action.payload;
        },
        getUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logoutUser(state) {
            state.user = null;
        },
    },
});

export const {
    getUserStart,
    getUserSuccess,
    getUserFailure,
    logoutUser,
} = userSlice.actions;

export default userSlice.reducer;

export const loadUser = (): AppThunk => async dispatch => {
    try {
        dispatch(getUserStart());
        const user = await userService.getUser();
        dispatch(getUserSuccess(user));
    } catch (error) {
        dispatch(getUserFailure(error.message));
    }
};

export const loginUser = (user: User): AppThunk => dispatch => {
    dispatch(getUserSuccess(user));
};
