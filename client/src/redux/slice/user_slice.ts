import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: {
    user_id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    name: string;
  } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
