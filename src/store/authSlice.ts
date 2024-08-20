import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface UserData {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    fullName: string;
    coverImage: string;
    subscribersCount: number;
    isSubscribed: boolean;
  }
  
interface AuthState {
  userData: UserData | null; // Or undefined if it can be undefined
  status: boolean;
}

const initialState: AuthState = {
  userData: null,
  status: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
      state.status = true;
    },
    logout: (state) => {
      state.userData = null;
      state.status = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
