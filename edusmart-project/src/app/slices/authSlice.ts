// src/app/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, UserProfile } from '../../types/auth';

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Thêm 2 action mới
    // Gọi khi bắt đầu gọi API (hiện spinner)
    authStart(state) {
      state.status = 'loading';
      state.error = null;
    },

    // Gọi khi API trả về lỗi (hiện thông báo lỗi)
    authFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    // Action khi đăng nhập thành công
    loginSuccess(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
      state.status = 'success';
      state.error = null;
      // (Trong thực tế, bạn cũng sẽ lưu token ở đây)
      // state.token = action.payload.token;
    },
    // Action khi đăng xuất
    logout(state) {
      // state.user = null;
      // state.token = null;
      // state.status = 'idle';
      Object.assign(state, initialState);
    },
  },
});

export const { authStart, authFailed, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;