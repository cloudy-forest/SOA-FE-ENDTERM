// src/app/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, UserProfile } from '../../types/auth';

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action khi đăng nhập thành công
    loginSuccess(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
      state.status = 'success';
      // (Trong thực tế, bạn cũng sẽ lưu token ở đây)
    },
    // Action khi đăng xuất
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;